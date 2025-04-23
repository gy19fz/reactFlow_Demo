import React from 'react';
import { useDnD } from './DnDContext';
 
export default () => {
  const [_, setType] = useDnD();
 
  const onDragStart = (event:React.DragEvent<HTMLDivElement>, nodeType:string) => {
    (setType as Function)(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside>
      <div
        className="dndnode text-updater"
        onDragStart={(event) => onDragStart(event, 'textUpdater')}
        draggable
      >
        Text Updater Node
      </div>
    </aside>
  );
};