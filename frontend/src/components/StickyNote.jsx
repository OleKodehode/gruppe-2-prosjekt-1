export default function StickyNote({ color, text, index, removeNote }) {
  const placeholder = text === "Write down your thoughts...";
  return (
    <article
      className={`stickynote ${color} z-${
        index + 1
      } flex justify-center items-center text-lg`}
      onClick={() => removeNote()}
    >
      <p className={placeholder ? "text-zinc-700 italic" : ""}>{text}</p>
    </article>
  );
}
