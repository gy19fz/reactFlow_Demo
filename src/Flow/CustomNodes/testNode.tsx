import { useCallback, ChangeEvent, ChangeEventHandler } from "react";
import { Handle, Position} from '@xyflow/react'
const handleStyle = {left:10};

function TextUpdaterNode({data}:any){
    const onChange:ChangeEventHandler<HTMLInputElement> = useCallback( (evt:ChangeEvent<HTMLInputElement>)=>{}, [])
    return (
      <>
        <Handle type="target" position={Position.Top} />
          <div>
          <label htmlFor="text">Text:</label>
          <input id="text" name="text" onChange={onChange} className="nodrag" />
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          style={handleStyle}
        />
      </>
    )
}
export default TextUpdaterNode