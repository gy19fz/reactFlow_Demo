import { Button } from '../../components/antdComponents';
import type { CustomNodeData } from '../../types/nodeTypes';

interface NumberNodeContentProps {
  data: CustomNodeData;
  onUpdate: (newValue: number) => void;
}

export function NumberNodeContent({ data, onUpdate }: NumberNodeContentProps) {
  const value = 'value' in data && typeof data.value === 'number' ? data.value : 0;
  return (
    <div>
      <p>当前数字: {value}</p>
      <input
        type="number"
        value={value}
        onChange={(e) => onUpdate(Number(e.target.value))}
        style={{ marginBottom: 8, width: '100%' }}
      />
      <Button type="primary" onClick={() => onUpdate(0)}>
        重置
      </Button>
    </div>
  );
}