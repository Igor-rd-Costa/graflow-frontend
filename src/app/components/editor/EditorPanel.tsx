import { Dimensions } from "@/app/editor/page"

export type EditorPanelProps = Dimensions & {
  heading?: string,
  className?: string
}

export default function EditorPanel({heading, width, height, className, children}: EditorPanelProps & {children?: React.ReactNode}) {

  return (
    <section className={`w-full h-full border border-skyBlue grid-rows-[auto_1fr] ${className}`}>
      { heading !== undefined ?
        <h3 className="w-full bg-linear-to-tr from-[#97B4DEFF] from-[30%] pl-2 to-[#B6D3FDFF] text-[0.9rem]">{heading}</h3>
        : <h3></h3>
      }
      <div className="h-full w-full">
        {children}
      </div>
    </section>
  )
}