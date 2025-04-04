"use client"

import React, { useContext, useEffect, useRef, useState } from "react"
import { AuthContext, ProjectContext } from "../GlobalContextProvider"
import { useRouter } from "next/navigation";
import { PopUpContext } from "../components/popUps/PopUpLayer";
import ProjectService, {Project} from "@/services/Project";
import OutlinerPanel from "../components/editor/outlinerPanel/OutlinerPanel";
import ViewPanel from "../components/editor/viewPanel/ViewPanel";
import PropertiesPanel from "../components/editor/propertiesPanel/PropertiesPanel";
import TimelinePanel from "../components/editor/timelinePanel/TimelinePanel";
import ResizeBar, { Vec2 } from "../components/editor/ResizeBar";

export type Dimensions = {
  width?: number,
  height?: number
};


export type EditorSettings = {
  dimensions: {
    outliner: Dimensions,
    view: Dimensions,
    properties: Dimensions,
    timeline: Dimensions
  }
}

export const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  dimensions: {
    outliner: {width: 86},
    view: {},
    properties: {width: 244},
    timeline: {height: 244}
  }
};

export default function Page() {
  const router = useRouter();
  const {userInfo} = useContext(AuthContext);
  const { contentWrapper, projectPopUp } = useContext(PopUpContext);
  const { project, setProject } = useContext(ProjectContext);
  const editorWrapper = useRef<HTMLDivElement>(null);
  const editorSettings = useRef<EditorSettings>(DEFAULT_EDITOR_SETTINGS);
  const resizeDelta = useRef<number>(0);

  useEffect(() => {
    if (userInfo === null) {
      router.push("/login");
      return;
    }
    if (project === null) {
      new Promise<void>(async resolve => {
        let p: Project|null = ProjectService.FromStorage();
        if (p !== null) {
          if (p.user_id !== userInfo.user.id) {
            ProjectService.SaveToStorage(null);
            p = null;
          } else {
            const lastUpdate = await ProjectService.GetUpdatedAt(p.id);
            if (lastUpdate && p.updated_at < lastUpdate) {
              p = await ProjectService.Load(p.id);
            }
          }
        }
        while(p === null) {
          contentWrapper?.Blur();
          p = await projectPopUp?.Show(false);
          if (p !== null) {
            ProjectService.SaveToStorage(p);
          }
        }
        contentWrapper?.UnBlur();
        setProject(p);
        resolve();
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (editorWrapper.current === null) {
      return;
    }
    
    localStorage.removeItem('editorSettings');
    const editorSettingsStr = localStorage.getItem('editorSettings');  
    if (editorSettingsStr !== null) {
      const eSettings = JSON.parse(editorSettingsStr) as EditorSettings;
      editorSettings.current = eSettings;
    } else {
      editorSettings.current = DEFAULT_EDITOR_SETTINGS;
      localStorage.setItem("editorSettings", JSON.stringify(editorSettings.current));
    }
    setGridCols();
    setGridRows();
  }, []);

  const setGridCols = () => {
    if (editorWrapper.current === null) {
      return;
    }
    editorWrapper.current.style.gridTemplateColumns = 
    `${editorSettings.current.dimensions.outliner.width}px 5px 1fr 5px ${editorSettings.current.dimensions.properties.width}px`;
  }

  const setGridRows = () => {
    if (editorWrapper.current === null) {
      return;
    }
    editorWrapper.current.style.gridTemplateRows = 
    `1fr 5px ${editorSettings.current.dimensions.timeline.height}px`;
  }

  const onOutlinerResize = (offset: {x:number,y:number}) => {
    if (editorWrapper.current === null || editorSettings.current.dimensions.outliner.width === undefined) {
      return;
    }
    resizeDelta.current += offset.x;
    if (Math.abs(resizeDelta.current) > 90) {
      editorSettings.current.dimensions.outliner.width += resizeDelta.current;
      resizeDelta.current = 0;
      setGridCols();
    }
  };

  const onPropertiesResize = (offset: {x:number,y:number}) => {
    if (editorWrapper.current === null || editorSettings.current.dimensions.properties.width === undefined) {
      return;
    }
    editorSettings.current.dimensions.properties.width -= offset.x;
    setGridCols();
  };

  const onTimelineResize = (offset: {x:number,y:number}) => {
    if (editorWrapper.current === null || editorSettings.current.dimensions.timeline.height === undefined) {
      return;
    }
    editorSettings.current.dimensions.timeline.height += offset.y;
    setGridRows();
  };

  const onResizeEnd = () => {
    resizeDelta.current = 0;
    localStorage.setItem("editorSettings", JSON.stringify(editorSettings.current));
  }

  if (userInfo === null) {
    return;
  }

  editorSettings.current.dimensions.outliner.width = 244;
  return (
    <div id="hello" style={{gridTemplateColumns: `auto 5px 1fr 5px auto`}} 
    ref={editorWrapper} className="w-full p-2 h-full grid grid-rows-[1fr_5px_auto]">
      <OutlinerPanel className="col-start-1 row-start-1 row-end-4"></OutlinerPanel>
      <ResizeBar className="col-start-2 row-start-1 row-end-4 cursor-col-resize" onResize={onOutlinerResize} onResizeEnd={onResizeEnd}></ResizeBar>
      <ViewPanel className="col-start-3 row-start-1"></ViewPanel>
      <ResizeBar className="col-start-4 row-start-1 row-end-4 cursor-col-resize" onResize={onPropertiesResize} onResizeEnd={onResizeEnd}></ResizeBar>
      <PropertiesPanel className="col-start-5 row-start-1 row-end-4"></PropertiesPanel>
      <ResizeBar className="col-start-3 row-start-2 cursor-row-resize" onResize={onTimelineResize} onResizeEnd={onResizeEnd}></ResizeBar>
      <TimelinePanel className="col-start-3 row-start-3"></TimelinePanel>
    </div>
  )
}