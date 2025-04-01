import { forwardRef, useImperativeHandle, useRef } from "react";
import { ContentWrapperProps, ContentWrapperActions } from "./types";


const ContentWrapper = forwardRef<ContentWrapperActions, ContentWrapperProps>(({children}, ref) => {
  const isBlured = useRef<boolean>(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    blur: () => {
      if (isBlured.current) {
        return;
      }
      const w = wrapper.current;
      if (w !== null) {
        w.style.filter = 'blur(2px)';
        w.style.pointerEvents = 'none';
        w.style.userSelect = 'none';
        isBlured.current = true;
      }
    },
    unBlur: () => {
      if (!isBlured.current) {
        return;
      }
      const w = wrapper.current;
      if (w !== null) {
        w.style.filter = '';
        w.style.pointerEvents = '';
        w.style.userSelect = '';
        isBlured.current = false;
      }
    }
  }));

  return (
    <div ref={wrapper} className="w-full h-full">
      {children}
    </div>
  );
});

export default ContentWrapper;