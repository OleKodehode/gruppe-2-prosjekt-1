import useLocalStorage from "./hooks/useLocalStorage";
import NewNotesContainer from "./components/NewNotesContainer";
import { v4 as uuid } from "uuid";
import { useEffect, useRef, useState } from "react";
import StickyNote from "./components/StickyNote";

function App() {
  const [notes, setNotes] = useLocalStorage("myNotes", []);
  const [activeId, setActiveId] = useState(null);

  const maxZRef = useRef(0);
  useEffect(() => {
    maxZRef.current = notes.length
      ? Math.max(...notes.map((note) => note.z || 0))
      : 0;
  }, [notes]);

  const addNew = (color) => {
    const zIndex = maxZRef.current + 1;
    maxZRef.current = zIndex;

    setNotes((prev) => [
      ...prev,
      {
        text: "Write down your thoughts...",
        color: color,
        id: uuid(),
        x: 50,
        y: 50,
        z: zIndex,
      },
    ]);
  };

  const removeNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    setActiveId((prev) => (prev === id ? null : prev));
  };

  const editNote = (id, newContent) => {
    const text = newContent || "Write down your thoughts...";
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text } : note))
    );
  };

  const moveNote = (id, px, py) => {
    const nextZ = maxZRef.current + 1;
    maxZRef.current = nextZ;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, x: px, y: py, z: nextZ } : note
      )
    );
    setActiveId(id);
  };

  const moveToFront = (id) => {
    const nextZ = maxZRef.current + 1;
    maxZRef.current = nextZ;
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, z: nextZ } : note))
    );
    setActiveId(id);
  };

  return (
    <main>
      <section>
        <h1 className="text-xl text-center text-amber-600">Note Keeping</h1>
      </section>
      <section className="notecontainer gap-y-5 my-5">
        {notes &&
          notes
            .slice()
            .sort((a, b) => (a.z || 0) - (b.z || 0))
            .map((note) => (
              <StickyNote
                key={note.id}
                id={note.id}
                color={note.color}
                text={note.text}
                x={note.x}
                y={note.y}
                z={note.z}
                isActive={activeId === note.id}
                onPointerDown={() => moveToFront(note.id)}
                onMove={(id, px, py) => moveNote(id, px, py)}
                onEdit={(id, newContent) => editNote(id, newContent)}
                onDelete={() => removeNote(note.id)}
              />
            ))}
      </section>
      <NewNotesContainer addNew={addNew} />
    </main>
  );
}

export default App;

/*
Todo: Login modal
Todo: Delete note Modal
Todo: Trash Can for deleting notes
Todo: Fix bugs with drag and drop
Todo: Add in our custom fonts and possibility to choose between them.
Todo: Add font-choice to variables being saved with each note.
Todo: Make it responsive - Add a mobile layout
  - Mobile specific;
    - Hide notepiles in a drawer
    - Drawer opens up with a + button or something.
    - Figure out how to translate coordinates between different screen-sizes (absolute?)
Todo: Husky + ESLint
Todo: Backend integration (Much later)
Todo: If the user puts in a link to an image, swap out P tag with an img tag. 
Todo: Save the image link as text content in localstorage/backend
*/
