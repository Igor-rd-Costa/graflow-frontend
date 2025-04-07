import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import MainButton from "../../MainButton";
import ProjectItem from "./ProjectItem";
import { PopUpPropsBase, PopUpActionsBase, ProjectPopUpView } from "../types";
import FormInput from "../../FormInput";
import ProjectService, { Project } from "@/services/Project";
import SecondaryButton from "../../SecondaryButton";
import { AuthContext } from "@/app/GlobalContextProvider";

const ProjectPopUp = forwardRef<PopUpActionsBase, PopUpPropsBase>((props, ref) => {
  const {userInfo} = useContext(AuthContext);
  const [ visible, setVisible ] = useState<boolean>(false);
  const [allowCancel, setAllowCancel ] = useState<boolean>(true);
  const [ view, setView ] = useState<ProjectPopUpView>('load');
  const [selectedItem, setSelectedItem ] = useState<{ele: HTMLElement, id: string}|null>(null);
  const [projectsInfo, setProjectsInfo] = useState<Project[]>([]);

  let resolveFn = useRef<((value: Project | PromiseLike<Project|null> | null) => void)|null>(null);

  useImperativeHandle(ref, () => ({
    show: (canCancel: boolean) => {
      setVisible(true);
      setAllowCancel(canCancel);
      return new Promise<Project|null>(resolve => {
        resolveFn.current = resolve;
      });
    },
    hide: () => setVisible(false)
  }));

  const onGlobalMouseDown = (event: MouseEvent) => {
    event.stopPropagation();
    if (selectedItem !== null) {
      selectedItem.ele.style.backgroundColor = "";
      selectedItem.ele.style.border = "";
      setSelectedItem(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onGlobalMouseDown);

    return () => {
      document.removeEventListener('mousedown', onGlobalMouseDown);
    }
  }, []);

  useEffect(() => {
    if (userInfo === null || view !== 'load') {
      return;
    }
    ProjectService.GetProjects().then(infos => {
      setProjectsInfo(infos);
    });
  }, [view, userInfo])

  if (!visible) {
    return null;
  }

  const onLoad = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (selectedItem === null) {
      return;
    }
    const p = await ProjectService.Load(selectedItem.id);
    if (resolveFn.current !== null && p !== null) {
      setVisible(false);
      resolveFn.current(p);
    }
  };

  const onCancel = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!allowCancel) {
      return;
    }
    if (resolveFn.current !== null) {
      setVisible(false);
      resolveFn.current(null);
    }
  }


  const onItemClick = (item: HTMLElement, id: string) => {
    if (selectedItem !== null) {
      selectedItem.ele.style.backgroundColor = "";
      selectedItem.ele.style.border = "";
    }
    item.style.backgroundColor = "#97B4DE55";
    item.style.border = "1px solid var(--skyBlue)";
    setSelectedItem({ele: item, id});
  };

  const onItemSelect = (id: string) => {
    ProjectService.Load(id).then(project => {
      if (project === null) {
        return;
      }
      if (selectedItem !== null && resolveFn.current !== null) {
        selectedItem.ele.style.backgroundColor = "";
        selectedItem.ele.style.border = "";
        setVisible(false);
        resolveFn.current(project);
      }
    });
  };

  const onCreateProjectSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const t = event.target as HTMLFormElement;

    const nameInput = t.querySelector('input');
    if (nameInput === null) {
      return;
    }

    const name = nameInput.value.trim();
    if (name.length === 0) {
      return;
    }

    const p = await ProjectService.Create(name);
    if (p !== null && resolveFn.current !== null) {
      setVisible(false);
      resolveFn.current(p);
    }
  };

  return (
    <section className="absolute top-2/4 left-2/4 -translate-2/4 w-[50rem] h-[30rem] bg-darkBright shadow-card border border-skyBlue p-4 grid
    grid-rows-[auto_1fr] grid-cols-[auto_1fr] gap-4">
      <h2 className="font-mono text-[1.5rem] text-skyBlue row-start-1 col-start-1 col-end-3">
        {view === 'load' ? <>Load Project</> : <>Create Project</>}
      </h2>
      { view === 'load' ?
          <>
          <div className="w-[16.5rem] row-start-2 col-start-1 flex flex-col gap-y-1 h-full overflow-y-scroll">
            {
              projectsInfo.map((item) => {
                return (<ProjectItem key={item.id} project={item} onClick={onItemClick} onSelect={onItemSelect}></ProjectItem>)
              })
            }
          </div>
          <div className="w-[18rem] flex gap-2 row-start-3 col-start-1 col-end-3">
            <MainButton type="button" disabled={selectedItem === null}   onClick={onLoad}>Load</MainButton>
            <MainButton type="button" onClick={() => setView('create')}>Create</MainButton>
            <SecondaryButton type="button" disabled={!allowCancel} onClick={onCancel}>Cancel</SecondaryButton>
          </div>
          </>
        :
        <>
          <div className="w-[18rem] row-start-2 col-start-1">
            <form className="h-full grid grid-rows-[auto_1fr_auto]" onSubmit={onCreateProjectSubmit}>
              <FormInput label="Name" type="text"></FormInput>
            <div className="w-[18rem] flex gap-2 row-start-3">
              <MainButton type="submit">Create</MainButton>
              <MainButton type="button" onClick={() => setView('load')}>Load</MainButton>
              <SecondaryButton type="button" disabled={!allowCancel} onClick={onCancel}>Cancel</SecondaryButton>
            </div>
            </form>
          </div>
        </>
      }
      
    </section>
  )
});

export default ProjectPopUp;