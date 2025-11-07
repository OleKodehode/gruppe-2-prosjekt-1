// import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import NoteContainer from "./components/NoteContainer";
import NewNotesContainer from "./components/NewNotesContainer";

function App() {
  /*   const testingList = [
    { text: "Yellow Test", color: "yellow", id: 1 },
    { text: "Blue Test", color: "blue", id: 2 },
    { text: "Red Test", color: "red", id: 3 },
    { text: "Green Test", color: "green", id: 4 },
    { text: "new Test", color: "yellow", id: 5 },
    { text: "Write down your thoughts...", color: "red", id: 6 },
  ]; */
  const [notes, setNotes] = useLocalStorage("myNotes", []);

  const addNew = (color) => {
    setNotes((prev) => [
      ...prev,
      {
        text: "Write down your thoughts...",
        color: color,
        id: crypto.randomUUID(),
        pos: {
          x: 50,
          y: 50,
        },
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

  const updateNote = (id, pos) => {
    const { x, y } = pos;
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, pos: { x: x, y: y } } : note
      )
    );
  };

  const bringToFront = (id) => {
    console.log(`bring ${id} to front.`);
    setNotes((prev) => {
      const activeNote = prev.find((note) => note.id === id);
      const others = prev.filter((note) => note.id !== id);
      return [...others, activeNote];
    });
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
        updateNote={{ updatePos: updateNote, updateOrder: bringToFront }}
      />
      <NewNotesContainer addNew={addNew} />
    </main>
  );
}

export default App;

/*
Todo: Login modal
Todo: Delete Modal
Todo: Trash Can for deleting notes
Todo: Make notes movable by click & drag
Todo: Implement functionality to allow free placing of notes 
[Requires saving coordinates]
Todo: Add in our custom fonts and possibility to choose between them.
Todo: Add font-choice to variables being saved with each note.
Todo: Make it responsive - Add a mobile layout
  - Mobile specific;
    - Hide notepiles in a drawer
    - Drawer opens up with a + button or something.
    - Figure out how to translate coordinates between different screen-sizes (absolute?)
Todo: Husky + ESLint
Todo: Backend integration (Much later)
*/
