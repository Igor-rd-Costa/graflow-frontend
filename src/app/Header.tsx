"use client"
import Auth from "@/services/Auth";
import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext, ProjectContext } from "./GlobalContextProvider";
import { useRouter } from "next/navigation";
import MenuItem from "./components/MenuItem";
import { PopUpContext } from "./components/popUps/PopUpLayer";
import ProjectService, { Project } from "@/services/Project";

export default function Header() {
  const router = useRouter();
  const {user, setUser} = useContext(AuthContext);
  const {projectPopUp, contentWrapper} = useContext(PopUpContext);
  const {project, setProject} = useContext(ProjectContext);

  const logout = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (await Auth.Logout()) {
      setUser(null);
      router.push("/login");
    }
  }

  const onProjectLoadItemMouseDown = () => {
    new Promise<void>(async resolve => {
      contentWrapper?.Blur();
      const p = (await projectPopUp?.Show(true) ?? null) as Project|null;
      if (p !== null) {
        ProjectService.Load(p.id);
        setProject(p);
      }
      contentWrapper?.UnBlur();
      resolve();
    });
  };

  return (
    <header
      className="h-[3rem] w-full font-mono bg-skyBlue grid grid-cols-[10%_1fr_10%]">
        <div className="col-start-2 grid grid-cols-[auto_1fr_50%_1fr_auto]">
          <h1 className="font-bold text-[1.3rem] text-white content-center cursor-pointer col-start-1">
            <Link href="/">Graflow</Link>
          </h1>

          <div className="flex items-center col-start-3">
            {user !== null ?
              <ul className="relative w-[6rem] h-full">
                <MenuItem heading="Project" isTopLevel={true}>
                  <MenuItem heading="Load" onMouseDown={onProjectLoadItemMouseDown}></MenuItem>
                </MenuItem>
              </ul>
            : <></>
            }
          </div>
          
          <div className="content-center items-center flex gap-4 text-[0.9rem] col-start-5">
            {user === null 
            ?<>
              <button className=" cursor-pointer hover:text-white ">
                <Link href="/login">Login</Link>
              </button>
              <button className="hover:text-white cursor-pointer">
                <Link href="/register">Register</Link>
              </button>
            </>
            :<>
              <button className="hover:text-white cursor-pointer" onClick={logout}>
                Logout
              </button>
            </>}
          </div>
        </div>
      </header>
  )
}