import './index.css'
import { Dispatch, SetStateAction } from 'react'
import { Drawer } from '../antdComponents'
import TextNodeContent  from '../../Flow/nodeContents/TextNodeContent'
import {NumberNodeContent}  from '../../Flow/nodeContents/NumberNodeContent'
import type { CustomNodeData, NodeType } from '../../types/nodeTypes';

const contentMap: Record<
  NodeType,
  React.FC<{
    data: CustomNodeData;
    onUpdate: (value:any) => void
  }>
> = {
  textUpdater: TextNodeContent,
  number: NumberNodeContent,
}

interface NodeTabProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>;
  nodeType: NodeType;
  nodeId: string;
  data: CustomNodeData;
  onUpdate: (value: any) => void;
}

const NodeTab = (
  {
    open,
    setOpen,
    nodeType,
    nodeId,
    data,
    onUpdate,
  }:NodeTabProps
) => {
  const ContentComponent = contentMap[nodeType] || (() => <p>位置类型</p>)
  return(
    <>
      <Drawer
        title={`节点 ${nodeId}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ContentComponent data={data} onUpdate={onUpdate} />
      </Drawer>
    </>
  )    

}
export default NodeTab