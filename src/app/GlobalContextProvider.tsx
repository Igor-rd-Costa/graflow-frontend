import React, { createContext, useEffect, useState } from "react";
import Auth, { User, UserInfo } from "@/services/Auth";
import Http from "@/services/Http";
import PopUpLayer from "./components/popUps/PopUpLayer";
import { Project } from "@/services/Project";
import { DEFAULT_EDITOR_SETTINGS, EditorSettings } from "./editor/page";
import { OutlinerViewMode, OutlinerViewSize } from "./components/editor/outlinerPanel/OutlinerPanel";

function initServices() {
  Http.Init();
  Auth.Init();
}

const OUTLINER_SETTINGS_STR = "outlinerSettings"
export type OutlinerSettings = {
  width: number,
  size: OutlinerViewSize,
  mode: OutlinerViewMode
};

export type AuthContextType = {
  userInfo: UserInfo|null,
  setUserInfo: (value: UserInfo|null) => void
};

export type ProjectContextType = {
  project: Project|null,
  setProject: (value: Project|null) => void
};

export type EditorSettingsContextType = {
  outliner: {
    settings: OutlinerSettings|null,
    setSettings: (val: OutlinerSettings|null) => void
  }
};

export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  setUserInfo: () => {}
});

export const ProjectContext = createContext<ProjectContextType>({
  project: null,
  setProject: () => {}
});

export const EditorSettingsContext = createContext<EditorSettingsContextType>({
  outliner: {
    settings: null,
    setSettings: () => {}
  }
});

export default function GlobalContextProvider({children} : {children?: React.ReactNode}) {

  const [userInfo, setUserInfo ] = useState<UserInfo|null>(null);
  const [project, setProject ] = useState<Project|null>(null);

  const [outlinerSettings, setOutlinerSettings] = useState<OutlinerSettings|null>(null);


  const editorSettingsContext: EditorSettingsContextType = {
    outliner: {
      settings: outlinerSettings,
      setSettings: setOutlinerSettings
    }
  }

  useEffect(() => {
    initServices();
    Auth.User().then(u => {
      if ((u === null && userInfo === null) || (userInfo?.user.id === u?.id)) {
        return;
      }
      setUserInfo({user: u!, preferences: {}});
    });

    const viewString = localStorage.getItem(OUTLINER_SETTINGS_STR);
    let viewSettings: OutlinerSettings = {
      width: 108,
      size: 'M',
      mode: 'Grid'
    };
    if (viewString === null) {
      localStorage.setItem(OUTLINER_SETTINGS_STR, JSON.stringify(viewSettings));
    } else {
      viewSettings = JSON.parse(viewString);
    }
    setOutlinerSettings(viewSettings);
  }, []);
  
  return (
    <>
      <AuthContext.Provider value={{userInfo, setUserInfo}}>
      <ProjectContext.Provider value={{project, setProject}}>
      <EditorSettingsContext.Provider value={editorSettingsContext}>
        <PopUpLayer>
          {children}
        </PopUpLayer>
      </EditorSettingsContext.Provider>
      </ProjectContext.Provider>
      </AuthContext.Provider>
    </>
  )
}