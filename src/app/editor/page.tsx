"use client"

import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../GlobalContextProvider"
import { useRouter } from "next/navigation";
import { PopUpContext } from "../components/popUps/PopUpLayer";
import ProjectService, {Project} from "@/services/Project";

export default function Page() {
  const router = useRouter();
  const {user} = useContext(AuthContext);
  const [ project, setProject ] = useState<Project|null>(null);

  const { contentWrapper, projectPopUp } = useContext(PopUpContext);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
     
    const project = ProjectService.Project();
    if (project === null) {
      new Promise<void>(async resolve => {
        let p: Project|null;
        do {
          contentWrapper?.Blur();
          p = await projectPopUp?.Show(false);
        } while(p === null);
        contentWrapper?.UnBlur();
        setProject(p);
        resolve();
      });
    }
  }, [user])

  return (
    <div className="w-full h-full p-4">
      <div>Hello from Editor, {user?.username}</div>
      <h2 className="mt-1">
        Project:
        <span className="ml-1">
        {
          project !== null 
          ?
          <>{project.name}</>
          :
          <>Not loaded</>
        }
        </span>
      </h2>
    </div>
  )
}