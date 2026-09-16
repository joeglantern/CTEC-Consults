"""
Builds the CTEC mark and a shard set as lightweight glTF for the site.

  "C:/Program Files/Blender Foundation/Blender 5.2/blender.exe" --background --python scripts/blender-mark.py

Outputs (relative to site/):
  public/models/ctec-mark.glb   four ring segments matching logo.svg, bevelled, low poly
  public/models/shards.glb      six low-poly shards used as instanced particles
"""
import bpy, bmesh, math, random, os, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
OUT = os.path.join(ROOT, "public", "models")
os.makedirs(OUT, exist_ok=True)

# geometry of the mark, measured from logo.svg (outer radius 1, inner 0.5, gaps, mouth of the C at +-33 deg)
R_OUT, R_IN, DEPTH = 1.0, 0.5, 0.22
GAP = 1.6          # half gap at each split, degrees
MOUTH = 33.0       # half angle of the opening on the right
SEGS = 48          # arc subdivisions per 90 degrees


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def material(name, rgb, rough, metal):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*rgb, 1.0)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    return m


def srgb(hexstr):
    h = hexstr.lstrip("#")
    return tuple(((int(h[i:i + 2], 16) / 255.0) / 12.92 if int(h[i:i + 2], 16) / 255.0 <= 0.04045 else (((int(h[i:i + 2], 16) / 255.0) + 0.055) / 1.055) ** 2.4) for i in (0, 2, 4))


def arc_mesh(name, a0, a1, mat):
    """Annulus sector from angle a0 to a1 (degrees, counter clockwise from +X), extruded along Z."""
    bm = bmesh.new()
    n = max(4, int(SEGS * (a1 - a0) / 90.0))
    outer, inner = [], []
    for i in range(n + 1):
        a = math.radians(a0 + (a1 - a0) * i / n)
        outer.append(bm.verts.new((R_OUT * math.cos(a), R_OUT * math.sin(a), 0)))
        inner.append(bm.verts.new((R_IN * math.cos(a), R_IN * math.sin(a), 0)))
    faces = []
    for i in range(n):
        faces.append(bm.faces.new((inner[i], outer[i], outer[i + 1], inner[i + 1])))
    bmesh.ops.recalc_face_normals(bm, faces=faces)
    res = bmesh.ops.extrude_face_region(bm, geom=faces)
    verts = [g for g in res["geom"] if isinstance(g, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, vec=(0, 0, DEPTH), verts=verts)
    bmesh.ops.translate(bm, vec=(0, 0, -DEPTH / 2), verts=bm.verts[:])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    ob.data.materials.append(mat)
    bev = ob.modifiers.new("bevel", "BEVEL")
    bev.width = 0.018
    bev.segments = 3
    bev.limit_method = "ANGLE"
    bev.angle_limit = math.radians(40)
    for p in me.polygons:
        p.use_smooth = True
    return ob


def build_mark():
    reset()
    bone = material("bone", srgb("#F1ECE2"), 0.38, 0.08)
    ochre = material("ochre", srgb("#E0A030"), 0.32, 0.35)
    # order matches the four pillars, clockwise from the top right piece
    arc_mesh("arc_top_right", MOUTH, 90 - GAP, bone)
    arc_mesh("arc_top_left", 90 + GAP, 180 - GAP, bone)
    arc_mesh("arc_bottom_left", 180 + GAP, 270 - GAP, bone)
    arc_mesh("arc_bottom_right", 270 + GAP, 360 - MOUTH, ochre)
    export(os.path.join(OUT, "ctec-mark.glb"))


def shard_mesh(name, seed, mat):
    random.seed(seed)
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=1, radius=1.0)
    # squash and nudge so each shard is its own chunk, then flatten to low poly facets
    sx, sy, sz = (random.uniform(0.35, 1.0) for _ in range(3))
    for v in bm.verts:
        v.co.x *= sx
        v.co.y *= sy
        v.co.z *= sz
        v.co += v.normal * random.uniform(-0.12, 0.12)
    bmesh.ops.convex_hull(bm, input=bm.verts[:])
    bmesh.ops.dissolve_limit(bm, angle_limit=math.radians(18), verts=bm.verts[:], edges=bm.edges[:])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    ob.data.materials.append(mat)
    ob.location = ((seed % 3) * 3.0, (seed // 3) * 3.0, 0)
    return ob


def build_shards():
    reset()
    bone = material("bone", srgb("#F1ECE2"), 0.4, 0.08)
    bronze = material("bronze", srgb("#B07A2A"), 0.35, 0.5)
    for i in range(6):
        shard_mesh(f"shard_{i}", i + 11, bone if i % 3 else bronze)
    export(os.path.join(OUT, "shards.glb"))


def export(path):
    bpy.ops.object.select_all(action="SELECT")
    kwargs = dict(filepath=path, export_format="GLB", export_apply=True, export_yup=True,
                  export_materials="EXPORT", export_normals=True, export_texcoords=False,
                  export_colors=False, export_cameras=False, export_lights=False, export_animations=False)
    try:
        bpy.ops.export_scene.gltf(**kwargs)
    except TypeError:
        # older/newer exporter signatures drop or rename a flag; retry with the minimum set
        bpy.ops.export_scene.gltf(filepath=path, export_format="GLB", export_apply=True, export_yup=True)
    print("wrote", path, os.path.getsize(path), "bytes")


build_mark()
build_shards()
