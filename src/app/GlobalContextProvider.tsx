import React, { createContext, useEffect, useState } from "react";
import Auth, { User } from "@/services/Auth";
import Http from "@/services/Http";
import PopUpLayer from "./components/popUps/PopUpLayer";
import { Project } from "@/services/Project";

function initServices() {
  Http.Init();
  Auth.Init();
}

export type AuthContextType = {
  user: User|null,
  setUser: (value: User|null) => void
};

export type ProjectContextType = {
  project: Project|null,
  setProject: (value: Project|null) => void
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}
});

export const ProjectContext = createContext<ProjectContextType>({
  project: null,
  setProject: () => {}
});

export default function GlobalContextProvider({children} : {children?: React.ReactNode}) {

  const [user, setUser ] = useState<User|null>(null);
  const [project, setProject ] = useState<Project|null>(null);

  useEffect(() => {
    initServices();
    Auth.User().then(u => {
      if ((u === null && user === null) || (user?.id === u?.id)) {
        return;
      }
      setUser(u);
    });
  });
  
  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>
        <ProjectContext.Provider value={{project, setProject}}>
          <PopUpLayer>
            {children}
          </PopUpLayer>
        </ProjectContext.Provider>
      </AuthContext.Provider>
    </>
  )
}