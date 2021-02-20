import React, { useEffect, useState } from "react";
import "./index.scss";

export default function Cursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState(false);

  useEffect(() => {
    window.addEventListener("mousemove", e => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    });
    document.querySelectorAll("button, a, .cur-pointer").forEach(elem => {
      elem.addEventListener("mouseover", () => {
        setHoverState(true);
      });
      elem.addEventListener("mouseleave", () => {
        setHoverState(false);
      });
    });
  }, []);

  const props = {
    style: { transform: `translate(${mousePos.x}px, ${mousePos.y}px)` },
    "data-hover-state": hoverState
  };
  return (
    <>
      <div className="cursor-container">
        <span className="app-cursor" {...props}></span>
        <span className="app-cursor--border" {...props}></span>
      </div>
    </>
  );
}
