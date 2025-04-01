import { ProjectInfo } from "@/services/Project";
import React, { forwardRef } from "react"

type ProjectItemProps = {
  info: ProjectInfo,
  onClick?: (item: HTMLElement, id: string) => void
  onSelect?: (id: string) => void
}

const ProjectItem = forwardRef<null, ProjectItemProps>((props, ref) => {
  //bg-[#97B4DE55]
  const onMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    const t = event.currentTarget as HTMLElement;
    if (props.onClick) {
      props.onClick(t, props.info.id);
    }
  };

  const onDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (props.onSelect) {
      props.onSelect(props.info.id);
    }
  }

  return (
    <div className="font-mono w-[16rem] h-[3.5rem] cursor-pointer border border-transparent select-none hover:border-skyBlue" 
    onMouseDown={onMouseDown} onDoubleClick={onDoubleClick}>
      <div className="m-1 flex gap-x-2">
        <div className="h-[3rem] w-[3rem] border"></div>
        <div className="h-full">
          <p className="text-[1rem]">{props.info.name}</p>
          <p className="text-[0.8rem] text-[#CCCF]">2 hours ago</p>
        </div>
      </div>
    </div>
  )
});

export default ProjectItem;