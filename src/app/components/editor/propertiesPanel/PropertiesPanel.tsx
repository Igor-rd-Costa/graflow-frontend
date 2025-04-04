import { Dimensions } from "@/app/editor/page";
import EditorPanel, { EditorPanelProps } from "../EditorPanel";

export type PropertiesPanelProps = EditorPanelProps & {

};

export default function PropertiesPanel({width, height, className}: PropertiesPanelProps) {
  return (
    <EditorPanel heading="Properties" width={width} height={height} className={className}>
      
    </EditorPanel>
  )
}