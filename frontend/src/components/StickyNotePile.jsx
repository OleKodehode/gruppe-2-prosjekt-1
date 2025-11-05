export default function StickyNotePile({ color, addNew }) {
  return (
    <article
      className={`pile ${color} flex justify-center items-center border-b-8 border-zinc-50/80 hover:scale-105 hover:outline-4 hover:outline-stone-200`}
      onClick={() => addNew(color)}
    >
      <h3 className="text-xl">New Note</h3>
    </article>
  );
}
