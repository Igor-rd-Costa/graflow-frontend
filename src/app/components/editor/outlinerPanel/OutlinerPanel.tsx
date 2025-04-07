import EditorPanel, { EditorPanelProps } from "../EditorPanel";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import OutlinerGridItem, { OutlinerItemStyles } from "./OutlinerGridItem";
import OutlinerListItem from "./OutlinerListItem";

export type OutlinerViewSize = 'L'|'M'|'S';
export type OutlinerViewMode = 'Grid'|'List'

export type OutlinerView = {
  size: OutlinerViewSize,
  mode: OutlinerViewMode
}

export type OutlinerPanelProps = EditorPanelProps & {
  
};

export type OutlinerActions = {
  updateSize: () => void;
}

const OUTLINER_VIEW_SETTINGS_STR = "outlinerViewSettings";

const OutlinerPanel = forwardRef<OutlinerActions, OutlinerPanelProps>(({className}: OutlinerPanelProps, ref) => {
  const outlinerViewMenu = useRef<HTMLDivElement>(null);
  const viewMenuButton = useRef<HTMLButtonElement>(null);
  const itemsWrapper = useRef<HTMLDivElement>(null);
  const [outlinerViewSettings, setOutlinerViewSettings] = useState<OutlinerView|null>(null);
  const [isViewMenuVisible, setIsViewMenuVisible] = useState<boolean>(false);

  const updateSize = () => {
    const ele = itemsWrapper.current;
    if (outlinerViewSettings === null || ele === null) {
      return;
    }
    
    const size = outlinerViewSettings.size;
    const w = ele.parentElement!.getBoundingClientRect().width;
    if (outlinerViewSettings.mode === 'Grid') {
      let iconSize = 90;
      if (size === 'S') {
        iconSize = 50;
      } else if (size === 'M') {
        iconSize = 70;
      }
      let rowFit = 1;
      let width = iconSize + 16;
      iconSize += 4; // gap;
      while ((width + iconSize) <= w) {
        width += iconSize;
        rowFit++;
      }
      ele.style.width = `${width}px`;
    } else {
      ele.style.width = `${w}px`;
    }
  };

  useImperativeHandle(ref, () => {
    return { updateSize}
  });

  useEffect(() => {
    const viewString = localStorage.getItem(OUTLINER_VIEW_SETTINGS_STR);
    let viewSettings: OutlinerView = {
      size: 'M',
      mode: 'Grid'
    };
    if (viewString === null) {
      localStorage.setItem(OUTLINER_VIEW_SETTINGS_STR, JSON.stringify(viewSettings));
    } else {
      viewSettings = JSON.parse(viewString);
    }
    setOutlinerViewSettings(viewSettings);
  }, []);

  useEffect(() => {
    if (outlinerViewSettings === null) {
      return;
    }

    updateSize();
    localStorage.setItem(OUTLINER_VIEW_SETTINGS_STR, JSON.stringify(outlinerViewSettings));
  }, [outlinerViewSettings]);

  if (outlinerViewSettings === null) {
    return <></>
  }
  
  const onGlobalMouseDown = (event: MouseEvent) => {
    if (viewMenuButton.current === null || outlinerViewMenu.current === null || event.target === null) {
      return;
    }
    const t = event.target as HTMLElement;
    if (!viewMenuButton.current.contains(t) && !outlinerViewMenu.current.contains(t)) {
      setIsViewMenuVisible(false);
      document.removeEventListener('mousedown', onGlobalMouseDown);
    }
  }

  const showViewMenu = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsViewMenuVisible(true);
    document.addEventListener('mousedown', onGlobalMouseDown);
    setTimeout(() => {
      const menu = outlinerViewMenu.current;
      if (menu === null) {
        return;
      }
      menu.style.right = '0.75rem';
      const left = menu.getBoundingClientRect().left;
      if (left < 0) {
        const right = parseFloat(getComputedStyle(menu).right);
        menu.style.right = `${right + menu.getBoundingClientRect().left}px`;
      }
    })
  };

  const setViewSize = (newSize: OutlinerViewSize) => {
    return () => {
      setOutlinerViewSettings({size: newSize, mode: outlinerViewSettings.mode});
    }
  };

  const setViewMode = (newMode: OutlinerViewMode) => {
    return () => {
      setOutlinerViewSettings({size: outlinerViewSettings.size, mode: newMode});
    }
  };

  const items = [
    "HelloBiggerName.txt", "TestTest", "AYOuus", "Agagag", "dadsad", "dcxzeqt"
  ];

  const OutlinerItem = outlinerViewSettings.mode === 'Grid' ? OutlinerGridItem : OutlinerListItem;

  return (
    <EditorPanel className={className} 
    heading={
      <div className="grid grid-cols-[1fr_auto] items-center pr-1">
        <span>Outliner</span>
        <button ref={viewMenuButton} className="w-[1.1rem] h-[1.1rem] hover:text-white cursor-pointer" onMouseDown={showViewMenu}>
          <span className="material-symbols-outlined !text-[1.1rem]">
            grid_view
          </span>
        </button>
      </div>
    }>
      <div className="w-full flex justify-center">
      <div ref={itemsWrapper} style={outlinerViewSettings.mode === 'Grid' ? {display: 'flex', flexWrap: 'wrap'} : {display: 'grid'}} 
      className="p-2 gap-1">
          {items.map((val, index) => (
            <OutlinerItem name={val} key={index} size={outlinerViewSettings!.size}></OutlinerItem>
          ))
        }
      </div>
    </div>
      
      {isViewMenuVisible ?
        <div ref={outlinerViewMenu} className="absolute top-5 right-3 w-[8rem] text-[0.9rem] bg-dark shadow-card border border-skyBlue z-10">
          <h4 className="pl-1 text-[0.8rem] text-[#AAAF]">Size</h4>
          <div className="grid gap-y-1 p-1">
            <button style={outlinerViewSettings.size === 'S' ? {backgroundColor: '#AAA4', color: 'white'} : {}} className="w-full h-[1.5rem] grid grid-cols-[auto_1fr] items-center gap-[0.1rem] justify-items-start
            hover:text-white hover:bg-[#AAA4] pl-1" onClick={setViewSize('S')}>
              <div className="h-[1.4rem] w-[1.4rem] flex justify-center items-center">
                <span className="material-symbols-outlined !text-[1rem]">
                  square
                </span>
              </div>
              Small Icons
            </button>

            <button style={outlinerViewSettings.size === 'M' ? {backgroundColor: '#AAA4', color: 'white'} : {}} className="w-full h-[1.5rem] grid grid-cols-[auto_1fr] items-center gap-[0.1rem] justify-items-start 
            hover:text-white hover:bg-[#AAA4] pl-1" onClick={setViewSize('M')}>
            <div className="h-[1.4rem] w-[1.4rem] flex justify-center items-center">
                <span className="material-symbols-outlined !text-[1.2rem]">
                  square
                </span>
              </div>
              Medium Icons
            </button>

            <button style={outlinerViewSettings.size === 'L' ? {backgroundColor: '#AAA4', color: 'white'} : {}} className="w-full h-[1.5rem] grid grid-cols-[auto_1fr] items-center gap-[0.1rem] justify-items-start 
            hover:text-white hover:bg-[#AAA4] pl-1" onClick={setViewSize('L')}>
              <div className="h-[1.4rem] w-[1.4rem] flex justify-center items-center">
                <span className="material-symbols-outlined !text-[1.3rem]">
                  square
                </span>
              </div>
              Large Icons
            </button>
          </div>
          <h4 className="pl-1 text-[0.8rem] text-[#AAAF] mt-1">View</h4>
          <div className="grid grid-cols-2 gap-1 p-1 items-center">
            <button style={outlinerViewSettings.mode === 'Grid' ? {backgroundColor: '#AAA4', color: 'white'} : {}} 
            className="flex flex-col w-[50.6px] h-[50.6px] justify-self-end items-center justify-center 
            hover:text-white hover:bg-[#AAA4] w" onClick={setViewMode('Grid')}>
                <span className="material-symbols-outlined !text-[1.5rem]">
                  grid_view
                </span>
                Grid
            </button>
            <button style={outlinerViewSettings.mode === 'List' ? {backgroundColor: '#AAA4', color: 'white'} : {}} 
            className="flex flex-col w-[50.6px] h-[50.6px] justify-self-start items-center justify-center
            hover:text-white hover:bg-[#AAA4] w" onClick={setViewMode('List')}>
                <span className="material-symbols-outlined !text-[1.5rem]">
                  list
                </span>
                List
            </button>
          </div>
        </div>
      : <></>}
    </EditorPanel>
  )
});

export default OutlinerPanel;