import { Button } from '../../components/antdComponents';
import type { CustomNodeData } from '../../types/nodeTypes';

interface TextNodeContentProps {
  data: CustomNodeData,
  onUpdate: (newValue: string) => void
}

const TextNodeContent = ({ data, onUpdate }: TextNodeContentProps) => {
  return (
    <div>
      <p>当前文本 ：{data.value || '无'}</p>
      <input
        value={data.value as string}
        onChange={(e) => onUpdate(e.target.value)}
        style={{ marginBottom: 8, width: '100%' }}
      />
      <Button
        type="primary"
        onClick={()=>onUpdate('默认文本')}
      >重置文本</Button>
    </div>
  )
}
export default TextNodeContent