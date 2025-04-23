import { Handle, Position, NodeProps } from '@xyflow/react';
import type { CustomNode } from '../../types/nodeTypes'


const handleStyle = {left:10};

function TextUpdaterNode({ data, id }: NodeProps<CustomNode>){
   
    return (
      <>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 4 }}>
        <label htmlFor={`text-${id}`}>文本:</label>
        <input
          id={`text-${id}`}
          name="text"
          value={data.value as string}
          readOnly
          className="nodrag"
          style={{ marginLeft: 8 }}
        />
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