import React, { createContext, useRef } from "react";
import ProjectPopUp from "./projectPopUp/ProjectPopUp";
import { PopUpContextType, PopUpActionsBase, ProjectPopUpRef } from "./types";
import MainButton from "../MainButton";

export const PopUpContext = createContext<PopUpContextType>({});

export default function PopUpLayer({children} : {children: React.ReactNode}) {
  const projectPopUpRef = useRef<PopUpActionsBase>(null);

  const context: PopUpContextType = {
    projectPopUp: new ProjectPopUpRef(projectPopUpRef)
  };
  
  return (
    <PopUpContext.Provider value={context}>
      <div className="relative w-screen h-screen">
        <div className="w-full h-full">
          {children}
        </div>
        <ProjectPopUp ref={projectPopUpRef}></ProjectPopUp>
      </div>
    </PopUpContext.Provider>
  )
}