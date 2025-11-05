import { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import NoteContainer from "./components/NoteContainer";
import NewNotesContainer from "./components/NewNotesContainer";

function App() {
  const testingList = [
    { text: "Yellow Test", color: "yellow" },
    { text: "Blue Test", color: "blue" },
    { text: "Red Test", color: "red" },
    { text: "Green Test", color: "green" },
    { text: "new Test", color: "yellow" },
  ];
  const [notes, setNotes] = useState(testingList); // Switch to useLocalStorage("notes", []) later

  const addNew = (color) => {
    console.log(`tried to add a new note from the ${color} pile`);
  };

  return (
    <main>
      <section>
        <h1 className="text-xl text-center text-amber-600">Note Keeping</h1>
      </section>
      <NoteContainer notes={notes} />
      <NewNotesContainer addNew={addNew} />
    </main>
  );
}

export default App;
