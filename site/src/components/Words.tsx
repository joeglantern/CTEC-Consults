/** Splits a string into .word spans so the reveal hook can stagger them. */
export function Words({ text, italic = false }: { text: string; italic?: boolean }) {
  const parts = text.split(" ").filter(Boolean);
  const trailing = text.endsWith(" ");
  return (
    <>
      {parts.map((w, i) => (
        <span key={i} className="word" style={italic ? { fontStyle: "italic", fontWeight: 400 } : undefined}>
          {w}
          {i < parts.length - 1 || trailing ? " " : ""}
        </span>
      ))}
    </>
  );
}

/** Renders "plain *italic* plain" markup into spans. */
export function Emph({ text }: { text: string }) {
  const chunks = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {chunks.map((c, i) =>
        c.startsWith("*") ? <em key={i}>{c.slice(1, -1)}</em> : <span key={i}>{c}</span>
      )}
    </>
  );
}
