import { OutlinerViewSize } from "./OutlinerPanel"

export type OutlinerItemStyles = {
  width: string,
  height: string,
  fontSize: string
}

export type OutlinerItemProps = {
  size: OutlinerViewSize
  name: string
}

export default function OutlinerGridItem({size, name}: OutlinerItemProps) {
  let widthStr = '70px';
  let heightStr = '70px';
  let fontSizeStr = '0.9rem';
  let iconSize = '3.3rem';
  if (size === 'S') {
    widthStr = '50px';
    heightStr = '50px';
    fontSizeStr = '0.7rem';
    iconSize = '2.5rem';
  } else if (size === 'L') {
    widthStr = '90px';
    heightStr = '90px';
    fontSizeStr = '1rem';
    iconSize = '4rem';
  }
  
  return (
    <div style={{width: widthStr, fontSize: fontSizeStr, gridTemplateRows: `${heightStr} 1fr`}} 
    className="grid justify-items-center content-start border border-transparent hover:border-skyBlue hover:bg-[#97B4DE55] box-border">
      <div className="flex self-center justify-center items-center w-[85%] h-[85%]">
        <span style={{fontSize: iconSize}} className="material-symbols-outlined">
          description
        </span>
      </div>
      <div className="w-[85%] text-center truncate mb-1">{name}</div>
    </div>
  )
} 