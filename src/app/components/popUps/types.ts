import { Project } from "@/services/Project";
import { RefObject } from "react";

// BasePopUp

export interface PopUpActionsBase {
  show: (...args: any[]) => (any|Promise<any>),
  hide: (...args: any[]) => (any|Promise<any>)
}

export abstract class PopUpRef<T extends PopUpActionsBase>
{
  private readonly ref: RefObject<T|null>;

  public constructor(ref: RefObject<T|null>) {
    this.ref = ref;
  }

  Current() {
    return this.ref.current;
  }

  Show(allowCancel: boolean) {
    return this.ref.current?.show(allowCancel);
  }

  Hide() {
    return this.ref.current?.hide();
  }
}

export type PopUpPropsBase = {
  
}

export type PopUpContextType = {
  projectPopUp?: ProjectPopUpRef
};


// ProjectPopUp

export interface ProjectPopUpActions {
  show: () => Promise<Project|null>,
  hide: () => void
}

export type ProjectPopUpView = 'load'|'create';

export class ProjectPopUpRef extends PopUpRef<ProjectPopUpActions>
{
  public constructor(ref: RefObject<PopUpActionsBase|null>) {
    super(ref);
  }
}