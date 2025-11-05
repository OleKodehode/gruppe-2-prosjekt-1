import StickyNote from "./StickyNote";

export default function NoteContainer({ notes, removeNote, editNote }) {
  return (
    <section className="notecontainer grid grid-cols-4 gap-y-5 my-5 justify-items-center">
      {notes &&
        notes.map((note, index) => (
          <StickyNote
            {...note}
            color={note.color}
            text={note.text}
            key={index}
            index={index}
            removeNote={removeNote}
            editNote={editNote}
          />
        ))}
    </section>
  );
}
