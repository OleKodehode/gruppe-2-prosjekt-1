import { useState } from "react";
import useDragger from "../hooks/useDragger";

export default function StickyNote({
  color,
  text,
  index,
  removeNote,
  id,
  editNote,
}) {
  const placeholder = text === "Write down your thoughts...";
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(placeholder ? "" : text);
  const noteID = `note-${index}`;

  useDragger(noteID);

  // Delete button is there temporarily until I can implement deletion by other means

  return (
    <article
      className={`stickynote ${color} z-${
        index + 1
      } flex justify-center items-center text-lg relative`}
      id={noteID}
    >
      {isEditing ? (
        <textarea
          type=""
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          autoFocus
          onBlur={() => {
            editNote(id, newText);
            setIsEditing(false);
          }}
        />
      ) : (
        <p
          className={placeholder ? "text-zinc-700 italic" : ""}
          onClick={() => setIsEditing(!isEditing)}
        >
          {text}
        </p>
      )}
      <button
        className="p-2 absolute top-2 right-2 bg-zinc-500/60 rounded"
        onClick={() => removeNote(id)}
      >
        X
      </button>
    </article>
  );
}
