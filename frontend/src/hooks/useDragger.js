import { useEffect, useRef } from "react";

export default function useDragger(htmlId, noteId, onDragMove, onDragEnd) {
  const isClicked = useRef(false);
  const coords = useRef({ startX: 0, startY: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const target = document.getElementById(htmlId);
    if (!target) throw new Error("Element with given id doesn't exist"); // should rarely trigger

    const container = target.parentElement;
    if (!container) throw new Error("Target element must have a parent");

    const rect = container.getBoundingClientRect();
    const noteRect = target.getBoundingClientRect();

    const onMouseDown = (e) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;

      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
      onDragEnd(noteId);
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      let nextX = e.clientX - coords.current.startX + coords.current.lastX;
      let nextY = e.clientY - coords.current.startY + coords.current.lastY;

      // Clamping the note to make it stay inside the box
      nextX = Math.max(0, Math.min(nextX, rect.width - noteRect.width));
      nextY = Math.max(0, Math.min(nextY, rect.height - noteRect.height));

      const percentX = (nextX / rect.width) * 100;
      const percentY = (nextY / rect.height) * 100;

      target.style.left = `${percentX}%`;
      target.style.top = `${percentY}%`;

      onDragMove({ x: percentX, y: percentY });
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [htmlId, onDragMove, onDragEnd]);
}
