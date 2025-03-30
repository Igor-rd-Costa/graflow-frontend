"use client"

import React from "react"

type FormInputProps = {
  label?: string,
  type?: 'text'|'password'|'email'|'number',

}

export default function FormInput({label = "", type = 'text'}: FormInputProps) {

  const animateLabel = (labelEle: HTMLLabelElement, top?: number, left?: number, color?: string) => {
    const rect = labelEle.getBoundingClientRect();

    const topStl = (top !== undefined) ? `${top}px` : undefined;
    const leftStl = (left !== undefined) ? `${left}px` : undefined;
    
    const styles = getComputedStyle(labelEle);
    const start = {top: styles.top, left: styles.left, color: styles.color};
    const end = {top: topStl, left: leftStl, color};
    labelEle.animate([
      start,
      end
    ], {duration: 75})
    .addEventListener('finish', () => {
      if (topStl) {
        labelEle.style.top = topStl;
      }
      if (leftStl) {
        labelEle.style.left = leftStl;
      }
      if (color) {
        labelEle.style.color = color;
      }
    });
  }

  const onInputFocus = (event: React.FocusEvent) => {
    event.stopPropagation();
    if (event.target === null) {
      return;
    }
    const t = event.target as HTMLInputElement;
    if (t.previousSibling === null || t.previousSibling.nodeName !== 'LABEL') {
      console.log("AAA", t.previousSibling?.nodeName)
      return
    }
    const label = t.previousSibling as HTMLLabelElement;
    if (t.value !== "") {
      label.style.color = 'var(--skyBlueBright)';
      return;
    }
    animateLabel(label, 0, 0, 'var(--skyBlueBright)'); 
  };

  const onInputBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    if (event.target === null) {
      return;
    }
    const t = event.target as HTMLInputElement;
    if (t.previousSibling === null || t.previousSibling.nodeName !== 'LABEL') {
      return
    }
    const label = t.previousSibling as HTMLLabelElement;
    if (t.value !== "") {
      label.style.color = 'var(--skyBlue)';
      return;
    }
    animateLabel(label, 21.6, 4, '#97B4DE88');
  };

  return (
    <div className="grid relative">
      <div className="h-[21.6px]"></div>
      <label className="text-[0.9rem] absolute top-[21.6px] left-1 text-[#97B4DE88] pointer-events-none">{label}</label>
      <input className="text-[0.9rem] h-[1.5rem] bg-[#555F] border-b-2 border-skyBlue bg-transparent text-[#F0EBE5FF] 
      outline-none pl-1 focus:border-skyBlueBright" onFocus={onInputFocus} onBlur={onInputBlur}
      type={type}></input>
    </div>
  )
}