import React, { useRef, useState } from "react"

export type MenuItemProps = {
  heading: string,
  isTopLevel?: boolean,
  children?: React.ReactNode,
  onMouseDown?: () => void
}

export default function MenuItem({isTopLevel = false, heading, children, onMouseDown}: MenuItemProps) {
  const [showChildren, setShowChildren] = useState<boolean>(false);
  const showOnHover = useRef<boolean>(false);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (onMouseDown !== undefined) {
      onMouseDown();
      return;
    }
    if (children !== undefined) {
      setShowChildren(true);
    }
  };

  const onMouseEnter = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    showOnHover.current = true;
    setTimeout(() => {
      if (showOnHover.current && (!showChildren && children !== undefined)) {
        setShowChildren(true);
      }
    }, 500);
  }

  const onMouseLeave = (event: React.MouseEvent) => {
    event.preventDefault();
    if (showOnHover.current || showChildren) {
      showOnHover.current = false;
      setShowChildren(false);
    }
  }

  return (
    <div className={`${isTopLevel ? '' : ''} hover:text-white cursor-pointer w-full h-full bg-skyBlue`} 
    onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseDown={handleMouseDown}>
      <span className={`${showChildren ? 'bg-skyBlueBright' : ''} border border-transparent hover:border-[#1115] w-full h-full 
      hover:bg-skyBlueBright hover:shadow-[inset_0px_0px_6px_-3px_#111F] 
      flex items-center justify-center`}>{heading}</span>
      <div className={`${showChildren ? 'absolute' : 'hidden'} ${isTopLevel ? 'top-full left-2/4 -translate-x-2/4' : 'top-0 left-full'} bg-skyBlue w-full h-full`}>
        {children}
      </div>
    </div>
  )
} 