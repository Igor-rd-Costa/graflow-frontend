import { Dimensions } from "@/app/editor/page";
import EditorPanel, { EditorPanelProps } from "../EditorPanel";

export type TimelinePanelProps = EditorPanelProps & {

};

export default function TimelinePanel({width, height, className}: TimelinePanelProps) {
  return (
    <EditorPanel heading="Timeline" width={width} height={height} className={className}>

    </EditorPanel>
  )
}