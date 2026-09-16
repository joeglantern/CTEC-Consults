#!/usr/bin/env bash
# Builds phone sized cuts of every clip into public/video/m/.
#
# The masters are 1080p at 4 to 13 Mbps. A phone cannot buffer that inside the second
# or two a clip is on screen during a scroll, so it sits on its poster frame instead of
# playing. These are 960x540 with a hard bitrate ceiling, which streams immediately on a
# mobile connection, and at the size they are actually displayed the difference does not
# read. The index is moved to the front of each file so playback can start before the
# download finishes.

set -euo pipefail
cd "$(dirname "$0")/../public/video"
mkdir -p m

for f in *.mp4; do
  [ "$f" = "cgi-ink-loader.mp4" ] && continue
  out="m/$f"
  ffmpeg -y -loglevel error -i "$f" \
    -vf "scale=960:-2:flags=lanczos" -an \
    -c:v libx264 -crf 30 -preset fast -profile:v main -pix_fmt yuv420p \
    -maxrate 1100k -bufsize 2200k \
    -g 48 -keyint_min 48 -movflags +faststart "$out"
  printf "  %-24s %6.2f MB -> %5.2f MB\n" "$f" \
    "$(stat -c %s "$f" | awk '{print $1/1048576}')" \
    "$(stat -c %s "$out" | awk '{print $1/1048576}')"
done

echo
echo "total: $(du -sh m | cut -f1) against $(du -sh --exclude=m . | cut -f1) of masters"
