export default function StickyNote({ color, text, index }) {
  return (
    <article className={`stickynote ${color} z-${index + 1}`}>
      <p>{text}</p>
    </article>
  );
}
