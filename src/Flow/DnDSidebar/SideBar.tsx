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
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
};