import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import NoteContainer from "./components/NoteContainer";
import NewNotesContainer from "./components/NewNotesContainer";

function App() {
  const testingList = [
    { text: "Yellow Test", color: "yellow", id: 1 },
    { text: "Blue Test", color: "blue", id: 2 },
    { text: "Red Test", color: "red", id: 3 },
    { text: "Green Test", color: "green", id: 4 },
    { text: "new Test", color: "yellow", id: 5 },
    { text: "Write down your thoughts...", color: "red", id: 6 },
  ];
  const [notes, setNotes] = useLocalStorage("myNotes", []);

  const addNew = (color) => {
    console.log(`tried to add a new note from the ${color} pile`);
    setNotes((prev) => [
      ...prev,
      {
        text: "Write down your thoughts...",
        color: color,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id, newContent) => {
    if (!newContent) newContent = "Write down your thoughts...";
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, text: newContent } : note
      )
    );
  };

  return (
    <main>
      <section>
        <h1 className="text-xl text-center text-amber-600">Note Keeping</h1>
      </section>
      <NoteContainer
        notes={notes}
        removeNote={removeNote}
        editNote={editNote}
      />
      <NewNotesContainer addNew={addNew} />
    </main>
  );
}

export default App;
