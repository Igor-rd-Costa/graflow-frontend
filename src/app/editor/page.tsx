"use client"

import React, { useContext, useEffect, useState } from "react"
import { AuthContext, ProjectContext } from "../GlobalContextProvider"
import { useRouter } from "next/navigation";
import { PopUpContext } from "../components/popUps/PopUpLayer";
import ProjectService, {Project} from "@/services/Project";

export default function Page() {
  const router = useRouter();
  const {user} = useContext(AuthContext);
  const { project, setProject } = useContext(ProjectContext);

  const { contentWrapper, projectPopUp } = useContext(PopUpContext);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
      return;
    }
    if (project === null) {
      new Promise<void>(async resolve => {
        let p: Project|null = ProjectService.FromStorage();
        if (p !== null) {
          if (p.user_id !== user!.id) {
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