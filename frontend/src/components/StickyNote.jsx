import { useEffect, useState } from "react";
import useDragger from "../hooks/useDragger";

export default function StickyNote({
  id,
  color,
  text,
  x = 50,
  y = 50,
  z = 0,
  isActive = false,
  onPointerDown = () => {},
  onMove = () => {}, // Expects id, percentX, percentY
  onEdit = () => {}, // Expects id, newText
  onDelete = () => {},
}) {
  const noteID = `n-${id}`;
  const placeholder = text === "Write down your thoughts...";
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(placeholder ? "" : text);

  // Keeping local newText synced when text prop changes.
  useEffect(() => {
    setNewText(placeholder ? "" : text);
  }, [text, placeholder]);

  /* 
  Hook expects the ID from the article tag (htmlId), 
  the id attached to the note (noteId -> note.id), 
  callback for when a note is clicked,
  and a callback for when a note is being moved
  */
  useDragger(
    noteID,
    id,
    (e) => onPointerDown(e),
    (nid, px, py) => onMove(nid, px, py)
  );

  // Delete button is there temporarily until I can implement deletion by other means

  return (
    <article
      className={`stickynote ${color} flex justify-center items-center text-lg absolute touch-none`}
      id={noteID}
      style={{ top: `${y}%`, left: `${x}%`, zIndex: z }}
      onPointerDown={(e) => onPointerDown(e)}
    >
      {isEditing ? (
        <textarea
          type=""
          value={newText}
          className="note-content"
          onChange={(e) => setNewText(e.target.value)}
          autoFocus
          onBlur={() => {
            onEdit(id, newText);
            setIsEditing(false);
          }}
        />
      ) : (
        <p
          className={`${
            placeholder ? "text-zinc-700 italic" : ""
          } hover:cursor-pointer note-content`}
          onClick={(e) => {
            e.stopPropagation();
            // Only activate editing if it's active
            if (isActive) setIsEditing(true);
            else onPointerDown(); // request the note to become active.
          }}
        >
          {text}
        </p>
      )}
      <button
        className="note-content p-1 px-2 absolute top-2 right-2 bg-zinc-500/40 rounded-2xl cursor-pointer"
        onClick={() => {
          onDelete();
        }}
      >
        X
      </button>
    </article>
  );
}
