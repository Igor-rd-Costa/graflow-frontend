import React, { createContext, useEffect, useState } from "react";
import Auth, { User, UserInfo } from "@/services/Auth";
import Http from "@/services/Http";
import PopUpLayer from "./components/popUps/PopUpLayer";
import { Project } from "@/services/Project";
import { DEFAULT_EDITOR_SETTINGS, EditorSettings } from "./editor/page";

function initServices() {
  Http.Init();
  Auth.Init();
}

export type AuthContextType = {
  userInfo: UserInfo|null,
  setUserInfo: (value: UserInfo|null) => void
};

export type ProjectContextType = {
  project: Project|null,
  setProject: (value: Project|null) => void
};

export type EditorSettingsContextType = {
  settings: EditorSettings|null,
  setSettings: (value: EditorSettings) => void
};

export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  setUserInfo: () => {}
});

export const ProjectContext = createContext<ProjectContextType>({
  project: null,
  setProject: () => {}
});

export default function GlobalContextProvider({children} : {children?: React.ReactNode}) {

  const [userInfo, setUserInfo ] = useState<UserInfo|null>(null);
  const [project, setProject ] = useState<Project|null>(null);

  useEffect(() => {
    initServices();
    Auth.User().then(u => {
      if ((u === null && userInfo === null) || (userInfo?.user.id === u?.id)) {
        return;
      }
      setUserInfo({user: u!, preferences: {}});
    });
  }, []);
  
  return (
    <>
      <AuthContext.Provider value={{userInfo, setUserInfo}}>
      <ProjectContext.Provider value={{project, setProject}}>
        <PopUpLayer>
          {children}
        </PopUpLayer>
      </ProjectContext.Provider>
      </AuthContext.Provider>
    </>
  )
}