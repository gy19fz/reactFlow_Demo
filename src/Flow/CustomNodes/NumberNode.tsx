import { Handle, Position, NodeProps } from '@xyflow/react';
import type { CustomNode } from '../../types/nodeTypes';

function NumberNode({ data, id }: NodeProps<CustomNode>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 4 }}>
        <label htmlFor={`number-${id}`}>数字:</label>
        <input
          id={`number-${id}`}
          type="number"
          name="number"
          value={'value' in data && typeof data.value === 'number' ? data.value : 0}
          readOnly
          className="nodrag"
          style={{ marginLeft: 8 }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default NumberNode;