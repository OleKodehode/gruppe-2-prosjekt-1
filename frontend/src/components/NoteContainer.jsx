import StickyNote from "./StickyNote";

export default function NoteContainer({
  notes,
  removeNote,
  editNote,
  updateNote,
}) {
  return (
    <section className="notecontainer gap-y-5 my-5">
      {notes &&
        notes.map((note, index) => (
          <StickyNote
            {...note}
            color={note.color}
            text={note.text}
            key={note.id}
            index={index}
            removeNote={removeNote}
            editNote={editNote}
            updateNote={updateNote}
          />
        ))}
    </section>
  );
}
