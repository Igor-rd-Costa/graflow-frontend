import { Dimensions } from "@/app/editor/page";
import EditorPanel, { EditorPanelProps } from "../EditorPanel";

export type ViewPanelProps = EditorPanelProps & {

};

export default function ViewPanel({width, height, className}: ViewPanelProps) {
  return (
    <EditorPanel width={width} height={height} className={className}>
      
    </EditorPanel>
  )
}