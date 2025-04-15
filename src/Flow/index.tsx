import { useRef, useCallback } from "react";
import {
  ReactFlowProvider,
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Edge,
  Node,
  type OnConnect,
} from "@xyflow/react";
import './xy-theme.css'
import "@xyflow/react/dist/style.css";
import SideBar from './DnDSidebar/SideBar';
import { DnDProvider, useDnD } from './DnDSidebar/DnDContext';
import TextUpdaterNode from './CustomNodes/testNode'
import { Button } from '../components/antdComponents';
import { LeftSquareOutlined } from '@ant-design/icons'

const nodeTypes = {
  textUpdater: TextUpdaterNode, // 注册自定义节点类型
}

let id = 0;
const getId = () => `dndnode_${id++}`;
const initialNodes = [
  {
    id: getId(),
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<{ label: string }>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
 
  const onConnect = useCallback(
    (params:any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
 
  const onDragOver = useCallback((event:any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
 
  const onDrop = useCallback(
    (event:any) => {
      event.preventDefault();
      if (!type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: Node<{ label: string }> = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  const checkFlowData = useCallback(() => {
    console.log('Nodes:', nodes);
    console.log('Edges:', edges);
  }, [nodes, edges]);

  return (
    <div className="dndflow">
      <SideBar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <div className="reactflow-topBar">
          <div className="topBar-left">
            <LeftSquareOutlined className="back-icon"></LeftSquareOutlined>
            <div>当前流程</div>
          </div>
          <div className="topBar-right">
            <Button type="primary" onClick={checkFlowData}>流程图数据</Button>
          </div>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);


