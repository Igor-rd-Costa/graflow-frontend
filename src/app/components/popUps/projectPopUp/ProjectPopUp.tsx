import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import MainButton from "../../MainButton";
import ProjectItem from "./ProjectItem";
import { PopUpPropsBase, PopUpActionsBase, ProjectPopUpView } from "../types";
import FormInput from "../../FormInput";
import ProjectService, { Project } from "@/services/Project";
import SecondaryButton from "../../SecondaryButton";

const ProjectPopUp = forwardRef<PopUpActionsBase, PopUpPropsBase>((props, ref) => {
  const [ visible, setVisible ] = useState<boolean>(false);
  const [allowCancel, setAllowCancel ] = useState<boolean>(true);
  const [ view, setView ] = useState<ProjectPopUpView>('load');
  const [selectedItem, setSelectedItem ] = useState<{ele: HTMLElement, id: string}|null>(null);

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
  })

  if (!visible) {
    return null;
  }

  const onLoad = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (selectedItem === null) {
      return;
    }
    const p = ProjectService.Load(selectedItem.id);
    if (resolveFn.current !== null && p !== null) {
      setVisible(false);
      document.removeEventListener('mousedown', onGlobalMouseDown);
      resolveFn.current(p);
    }
  };

  const onCreate = (event: React.FormEvent) => {
    event.preventDefault();
    if (event.target === null) {
      return;
    }
    const t = event.target as HTMLFormElement;
    const input = t.querySelector('input');
    if (input === null) {
      return;
    }
    const name = input.value;
    if (name === "") {
      return;
    }

    const p = ProjectService.Create(name);
    if (p !== null && resolveFn.current !== null) {
      setVisible(false);
      document.removeEventListener('mousedown', onGlobalMouseDown);
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
      document.removeEventListener('mousedown', onGlobalMouseDown);
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

  return (
    <section className="absolute top-2/4 left-2/4 -translate-2/4 w-[50rem] h-[30rem] bg-darkBright shadow-card border border-skyBlue p-4 grid
    grid-rows-[auto_1fr] grid-cols-[auto_1fr] gap-4">
      <h2 className="font-mono text-[1.5rem] text-skyBlue row-start-1 col-start-1 col-end-3">
        {view === 'load' ? <>Load Project</> : <>Create Project</>}
      </h2>
      { view === 'load' ?
        <div className="w-[16.5rem] row-start-2 col-start-1 flex flex-col gap-y-1 h-full overflow-y-scroll">
          {
            ProjectService.GetProjectsInfo().map((item) => {
              return (<ProjectItem key={item.id} info={item} onClick={onItemClick}></ProjectItem>)
            })
          }
        </div> 
        :
        <div className="w-[18rem] row-start-2 col-start-1">
          <form>
            <FormInput label="Name" type="text"></FormInput>
          </form>
        </div>
      }
      <div className="w-[18rem] flex gap-2 row-start-3 col-start-1 col-end-3">
        {
          view === 'load' ?
          <>
            <MainButton type="button" disabled={selectedItem === null}   onClick={onLoad}>Load</MainButton>
            <MainButton type="button" onClick={() => setView('create')}>Create</MainButton>
          </>
          :
          <>
            <MainButton type="button" onClick={() => {}}>Create</MainButton>
            <MainButton type="button"  onClick={() => setView('load')}>Load</MainButton>
          </>
        }
        <SecondaryButton type="button" disabled={!allowCancel} onClick={onCancel}>Cancel</SecondaryButton>
      </div>
    </section>
  )
});

export default ProjectPopUp;