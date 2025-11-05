import { useState } from "react";
import StickyNote from "./components/StickyNote";
import useLocalStorage from "./hooks/useLocalStorage";
import StickyNotePile from "./components/StickyNotePile";

function App() {
  const addNew = (color) => {
    console.log(`tried to add a new note from the ${color} pile`);
  };
  return (
    <main>
      <div>
        <h1 className="text-xl text-center text-amber-600">Note Keeping</h1>
      </div>
      <div className="grid grid-cols-2 gap-y-5 my-5 justify-items-center">
        <StickyNote color="yellow" text="Test" />
        <StickyNote color="blue" text="Test" />
        <StickyNote color="red" text="Test" />
        <StickyNote color="green" text="Test" />
      </div>
      <div className="absolute right-5 top-20 flex flex-col gap-5">
        <StickyNotePile color="yellow" addNew={addNew} />
        <StickyNotePile color="blue" addNew={addNew} />
        <StickyNotePile color="red" addNew={addNew} />
        <StickyNotePile color="green" addNew={addNew} />
      </div>
    </main>
  );
}

export default App;
