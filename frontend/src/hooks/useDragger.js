import { useEffect, useRef } from "react";

export default function useDragger(
  htmlId,
  noteId,
  onDragStart = () => {},
  onDragEnd = () => {}
) {
  const draggingRef = useRef(false);
  const coords = useRef({
    startClientX: 0,
    startClientY: 0,
    startLeft: 0,
    startTop: 0,
  });
  const geometryRef = useRef({ containerRect: null, noteRect: null });

  const onDragStartRef = useRef(onDragStart);
  const onDragEndRef = useRef(onDragEnd);

  useEffect(() => {
    onDragStartRef.current = onDragStart;
    onDragEndRef.current = onDragEnd;
  }, [onDragStart, onDragEnd]);

  useEffect(() => {
    const target = document.getElementById(htmlId);
    if (!target) return;

    const container = target.parentElement;
    if (!container) return;

    const getGeometry = () => {
      geometryRef.current.containerRect = container.getBoundingClientRect();
      geometryRef.current.noteRect = target.getBoundingClientRect();
    };

    getGeometry();

    const onResize = () => getGeometry();
    window.addEventListener("resize", onResize);

    const pointerDown = (e) => {
      if (e.button && e.button !== 0) return; //only left button or touch event
      try {
        onDragStartRef.current?.(e);
      } catch (err) {
        console.error(err);
      }

      const noDrag = e.target.closest(".note-content, p, button, textarea");
      if (noDrag) return;

      draggingRef.current = true;
      getGeometry();

      coords.current.startClientX = e.clientX;
      coords.current.startClientY = e.clientY;
      coords.current.startLeft = target.offsetLeft;
      coords.current.startTop = target.offsetTop;

      target.classList.toggle("dragging");

      try {
        target.setPointerCapture?.(e.pointerId);
      } catch (err) {
        console.error("Pointerdown capture error:", err);
      }
      // Allow parent ot handle bringing to front via it's onPointerDown
      e.preventDefault();
    };

    const pointerMove = (e) => {
      if (!draggingRef.current) return;

      // Recomputing noteRect just in case
      geometryRef.current.noteRect = target.getBoundingClientRect();
      const { containerRect, noteRect } = geometryRef.current;
      if (!containerRect || !noteRect) return;

      let nextX =
        e.clientX - coords.current.startClientX + coords.current.startLeft;
      let nextY =
        e.clientY - coords.current.startClientY + coords.current.startTop;

      // Clamping to container bounds
      nextX = Math.max(
        0,
        Math.min(nextX, containerRect.width - noteRect.width)
      );
      nextY = Math.max(
        0,
        Math.min(nextY, containerRect.height - noteRect.height)
      );

      // Convert to percentage
      const percentX = (nextX / containerRect.width) * 100;
      const percentY = (nextY / containerRect.height) * 100;

      target.style.left = `${percentX}%`;
      target.style.top = `${percentY}%`;

      //comment out below to possibly disable live update:
      onDragEndRef.current(noteId, percentX, percentY);
    };

    const pointerUp = (e) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;

      try {
        target.releasePointerCapture?.(e.pointerId);
      } catch (err) {
        console.error("Issue with releasing pointer capture," + err);
      }

      // If the element gets removed
      if (!document.body.contains(target)) return;

      getGeometry();

      const left = target.offsetLeft;
      const top = target.offsetTop;
      const containerWidth = geometryRef.current.containerRect?.width || 1;
      const containerHeight = geometryRef.current.containerRect?.height || 1;
      const percentX = (left / containerWidth) * 100;
      const percentY = (top / containerHeight) * 100;

      target.classList.toggle("dragging");

      try {
        onDragEndRef.current?.(noteId, percentX, percentY);
      } catch (err) {
        console.error("onDragEnd error:", err);
      }
    };

    target.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", pointerUp);
    window.addEventListener("pointercancel", pointerUp);
    container.addEventListener("pointerleave", pointerUp);

    const cleanup = () => {
      target.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("pointercancel", pointerUp);
      container.removeEventListener("pointerleave", pointerUp);
      window.removeEventListener("resize", onResize);
    };

    return cleanup;
  }, [htmlId, noteId]);
}
