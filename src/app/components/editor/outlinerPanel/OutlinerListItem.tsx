import { useEffect } from "react";
import { OutlinerItemProps } from "./OutlinerGridItem";


export default function OutlinerListItem({size, name}: OutlinerItemProps) {
  
  let heightStr = '1.7rem';
  let fontSizeStr = '1rem';
  let iconSize = '1.3rem';
  if (size === 'S') {
    heightStr = '1.5rem';
    fontSizeStr = '0.9rem';
    iconSize = '1.1rem';
  } else if (size === 'L') {
    heightStr = '1.9rem';
    fontSizeStr = '1.1rem';
    iconSize = '1.5rem';
  }
  
  return (
    <div style={{height: heightStr, fontSize: fontSizeStr}} 
    className="grid gap-x-1 grid-cols-[auto_1fr] justify-content-center items-center border border-transparent hover:border-skyBlue hover:bg-[#97B4DE55]">
      <div style={{width: iconSize, height: iconSize}}>
        <span style={{fontSize: iconSize}} className="material-symbols-outlined">
            description
        </span>
      </div>
      <div className="truncate text-[#CCCF]">{name}</div>
    </div>
  )
}