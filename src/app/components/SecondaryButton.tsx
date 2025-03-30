"use client"
import React from "react";

type SecondaryButtonProps = {
  type?: 'button'|'reset'|'submit',
  disabled?: boolean,
  children?: React.ReactNode,
  onClick?: (event: React.MouseEvent) => void
}

export default function SecondaryButton({type = 'button', disabled = false, onClick = () => {}, children}: SecondaryButtonProps) {
  return (
    <button type={type} disabled={disabled} className="bg-[#DDDF] w-full text-dark h-[2rem] grid justify-center items-center shadow-card 
    disabled:bg-[#AAAF] enabled:cursor-pointer enabled:hover:bg-bright outline-0 border-2 border-transparent focus:border-skyBlue" onClick={onClick}>
      {children}
    </button>
  )
}