import { Dimensions } from "@/app/editor/page";
import EditorPanel, { EditorPanelProps } from "../EditorPanel";

export type OutlinerPanelProps = EditorPanelProps & {
  
};

export default function OutlinerPanel({className}: OutlinerPanelProps) {
  return (
    <section className={`h-full border border-skyBlue grid-rows-[auto_1fr] ${className}`}>
      <h3 className="w-full bg-linear-to-tr from-[#97B4DEFF] from-[30%] pl-2 to-[#B6D3FDFF] text-[0.9rem]">Outliner</h3>
      <div className="h-full w-full">
        <div className="p-2 flex flex-wrap gap-2">
          <div className="border border-red-500 w-[70px] h-[70px]"></div>
          <div className="border border-red-500 w-[70px] h-[70px]"></div>
          <div className="border border-red-500 w-[70px] h-[70px]"></div>
          <div className="border border-red-500 w-[70px] h-[70px]"></div>
        </div>
      </div>
    </section>
  )
}