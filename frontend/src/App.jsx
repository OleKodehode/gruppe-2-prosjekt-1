import { useState } from "react";
import StickyNote from "./components/StickyNote";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
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
    </main>
  );
}

export default App;
