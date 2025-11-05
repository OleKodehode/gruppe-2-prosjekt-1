import StickyNote from "./StickyNote";

export default function NoteContainer({ notes, removeNote }) {
  return (
    <section className="grid grid-cols-2 gap-y-5 my-5 justify-items-center">
      {notes &&
        notes.map((note, index) => (
          <StickyNote
            color={note.color}
            text={note.text}
            key={index}
            index={index}
            removeNote={() => removeNote(note.id)}
          />
        ))}
    </section>
  );
}
