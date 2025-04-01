import React, { createContext, forwardRef, useRef } from "react";
import ProjectPopUp from "./projectPopUp/ProjectPopUp";
import { PopUpContextType, PopUpActionsBase, ProjectPopUpRef, ProjectPopUpActions, ContentWrapperActions, ContentWrapperRef } from "./types";
import MainButton from "../MainButton";
import ContentWrapper from "./ContentWrapper";

export const PopUpContext = createContext<PopUpContextType>({});

export default function PopUpLayer({children} : {children: React.ReactNode}) {
  const projectPopUpRef = useRef<ProjectPopUpActions>(null);
  const contentWrapperRef = useRef<ContentWrapperActions>(null);

  const context: PopUpContextType = {
    contentWrapper: new ContentWrapperRef(contentWrapperRef),
    projectPopUp: new ProjectPopUpRef(projectPopUpRef)
  };
  
  return (
    <PopUpContext.Provider value={context}>
      <div className="relative w-full h-full">
        <ContentWrapper ref={contentWrapperRef}>
          {children}
        </ContentWrapper>
        <ProjectPopUp ref={projectPopUpRef}></ProjectPopUp>
      </div>
    </PopUpContext.Provider>
  )
}