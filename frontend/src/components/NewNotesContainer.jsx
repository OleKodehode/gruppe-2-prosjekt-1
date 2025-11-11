import StickyNotePile from "./StickyNotePile";

export default function NewNotesContainer({ addNew }) {
  return (
    <section className="absolute right-5 top-5 flex flex-col gap-4">
      <StickyNotePile color="yellow" addNew={addNew} key={"yellow"} />
      <StickyNotePile color="blue" addNew={addNew} key={"blue"} />
      <StickyNotePile color="red" addNew={addNew} key={"red"} />
      <StickyNotePile color="green" addNew={addNew} key={"green"} />
    </section>
  );
}
