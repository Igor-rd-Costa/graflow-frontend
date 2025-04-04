import { Dimensions } from "@/app/editor/page";
import { useRef } from "react";

export type Vec2 = {x:number, y:number};

export type ResizeBarProps = {
  className?: string,
  onResize: (offset: Vec2) => void,
  onResizeEnd: () => void
}


export default function ResizeBar({className, onResize, onResizeEnd}: ResizeBarProps) {
  const cursorPos = useRef<{x:number,y:number}|null>(null);
  const bar = useRef<HTMLDivElement>(null);

  const onMouseMove = (event: MouseEvent) => {
    if (cursorPos.current === null) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const offset = {x: event.clientX - cursorPos.current.x, y: cursorPos.current.y - event.clientY};
    cursorPos.current = {x: event.clientX, y: event.clientY};
    onResize(offset);
  };

  const onMouseUp = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    cursorPos.current = null;

    onResizeEnd();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    cursorPos.current = {x: event.clientX, y: event.clientY};
    

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (<div ref={bar} className={`w-full h-full ${className}`} 
    onMouseDown={onMouseDown}></div>);
}