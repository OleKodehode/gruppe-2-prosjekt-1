export default function StickyNote({ color, text }) {
  return (
    <article className={`stickynote ${color}`}>
      <p>{text}</p>
    </article>
  );
}
