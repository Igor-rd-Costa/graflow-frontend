"use client"
import React from "react";

type MainButtonProps = {
  type?: 'button'|'reset'|'submit',
  disabled?: boolean,
  children?: React.ReactNode,
  onClick?: (event: React.MouseEvent) => void
}

export default function MainButton({type = 'button', disabled = false, onClick = () => {}, children}: MainButtonProps) {
  return (
    <button type={type} disabled={disabled} className="bg-skyBlue w-full text-dark h-[2rem] grid justify-center items-center shadow-card 
    disabled:bg-[#BBBF] enabled:cursor-pointer enabled:hover:bg-skyBlueBright outline-0 border-2 border-transparent focus:border-white" onClick={onClick}>
      {children}
    </button>
  )
}