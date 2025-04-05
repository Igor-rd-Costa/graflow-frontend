import {  } from "@/app/editor/page";
import EditorPanel, { EditorPanelProps } from "../EditorPanel";
import { useContext, useRef, useState } from "react";

export type OutlinerPanelProps = EditorPanelProps & {
};

export default function OutlinerPanel({className}: OutlinerPanelProps) {
  const outlinerViewMenu = useRef<HTMLDivElement>(null);
  const viewMenuButton = useRef<HTMLButtonElement>(null);
  const [isViewMenuVisible, setIsViewMenuVisible] = useState<boolean>(false);

  const onGlobalMouseDown = (event: MouseEvent) => {
    if (viewMenuButton.current === null || outlinerViewMenu.current === null || event.target === null) {
      return;
    }
    const t = event.target as HTMLElement;
    if (!viewMenuButton.current.contains(t) && !outlinerViewMenu.current.contains(t)) {
      setIsViewMenuVisible(false);
      document.removeEventListener('mousedown', onGlobalMouseDown);
    }
  }

  const showViewMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsViewMenuVisible(true);
    document.addEventListener('mousedown', onGlobalMouseDown);
  };

  return (
    <EditorPanel className={className} 
    heading={
      <div className="grid grid-cols-[1fr_auto] items-center pr-1">
        <span>Outliner</span>
        <button ref={viewMenuButton} className="w-[1.1rem] h-[1.1rem] hover:text-white cursor-pointer" onMouseDown={showViewMenu}>
          <span className="material-symbols-outlined !text-[1.1rem]">
            grid_view
          </span>
        </button>
      </div>
    }>
      <div className="p-2 flex flex-wrap gap-2">
        <div className="border border-red-500 w-[70px] h-[70px]"></div>
        <div className="border border-red-500 w-[70px] h-[70px]"></div>
        <div className="border border-red-500 w-[70px] h-[70px]"></div>
        <div className="border border-red-500 w-[70px] h-[70px]"></div>
      </div>
      
      {isViewMenuVisible ?
        <div ref={outlinerViewMenu} className="absolute top-5 right-3 w-[8rem] text-[0.9rem] bg-dark shadow-card border border-skyBlue">
          <h4 className="pl-1 text-[0.8rem] text-[#AAAF]">Size</h4>
          <div className="grid gap-y-1 p-1">
            <button className="w-full h-[1.5rem] grid grid-cols-[auto_1fr] items-center gap-[0.1rem] justify-items-start hover:text-white hover:bg-[#AAA4] pl-1">
              <div className="h-[1.4rem] w-[1.4rem] flex justify-center items-center">
                <span className="material-symbols-outlined !text-[1rem]">
                  square
                </span>
              </div>
              Small Icons
            </button>
            <button className="w-full h-[1.5rem] grid grid-cols-[auto_1fr] items-center gap-[0.1rem] justify-items-start hover:text-white hover:bg-[#AAA4] pl-1">
            <div className="h-[1.4rem] w-[1.4rem] flex justify-center items-center">
                <span className="material-symbols-outlined !text-[1.2rem]">
                  square
                </span>
              </div>
              Medium Icons
            </button>
            <button className="w-full h-[1.5rem] grid grid-cols-[auto_1fr] items-center gap-[0.1rem] justify-items-start hover:text-white hover:bg-[#AAA4] pl-1">
              <div className="h-[1.4rem] w-[1.4rem] flex justify-center items-center">
                <span className="material-symbols-outlined !text-[1.3rem]">
                  square
                </span>
              </div>
              Large Icons
            </button>
          </div>
          <h4 className="pl-1 text-[0.8rem] text-[#AAAF] mt-1">View</h4>
          <div className="grid grid-cols-2 gap-y-1 p-1 items-center">
            <button className="flex flex-col w-[50.6px] h-[50.6px] justify-self-end items-center justify-center hover:text-white hover:bg-[#AAA4] w">
                <span className="material-symbols-outlined !text-[1.5rem]">
                  grid_view
                </span>
                Grid
            </button>
            <button className="flex flex-col w-[50.6px] h-[50.6px] justify-self-start items-center justify-center hover:text-white hover:bg-[#AAA4] w">
                <span className="material-symbols-outlined !text-[1.5rem]">
                  list
                </span>
                List
            </button>
          </div>
        </div>
      : <></>}
    </EditorPanel>
  )
}