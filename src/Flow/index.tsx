import { useRef, useCallback, useState, Dispatch, SetStateAction } from 'react';
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
  OnConnect,
  Node,
} from '@xyflow/react';
import './xy-theme.css';
import '@xyflow/react/dist/style.css';
import SideBar from './DnDSidebar/SideBar';
import { DnDProvider, useDnD } from './DnDSidebar/DnDContext';
import TextUpdaterNode from './CustomNodes/TextUpdaterNode';
import NumberNode from './CustomNodes/NumberNode';
import NodeTab from '../components/NodeTab';
import { Button } from '../components/antdComponents';
import { LeftSquareOutlined } from '@ant-design/icons';
import type { CustomNode, CustomNodeData, NodeType, TextNodeData, NumberNodeData } from '../types/nodeTypes';

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  number: NumberNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialNodes: CustomNode[] = [
  {
    id: getId(),
    type: 'textUpdater',
    data: { label: 'Text Node', value: 'Hello' },
    position: { x: 250, y: 5 },
  },
];

const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const [drawerState, setDrawerState] = useState<{
    open: boolean;
    nodeType: NodeType | null;
    nodeId: string;
    data: CustomNodeData;
  }>({
    open: false,
    nodeType: null,
    nodeId: '',
    data: { label: '', value: '' }, // 初始为 TextNodeData
  });

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!type || (type !== 'textUpdater' && type !== 'number')) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode: CustomNode;
      if (type === 'textUpdater') {
        newNode = {
          id: getId(),
          type: 'textUpdater',
          position,
          data: { label: 'Text Node', value: 'New Text' } as TextNodeData,
        } as Node<TextNodeData, 'textUpdater'>;
      } else {
        newNode = {
          id: getId(),
          type: 'number',
          position,
          data: { label: 'Number Node', value: 0 } as NumberNodeData,
        } as Node<NumberNodeData, 'number'>;
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes],
  );

  const openDrawer = useCallback(
    (nodeType: NodeType, nodeId: string, data: CustomNodeData) => {
      setDrawerState({ open: true, nodeType, nodeId, data });
    },
    [],
  );

  const setDrawerOpen = useCallback(
    (open: boolean | ((prev: boolean) => boolean)) => {
      setDrawerState((prev) => ({
        ...prev,
        open: typeof open === 'function' ? open(prev.open) : open,
      }));
    },
    [],
  );

  const updateNodeData = useCallback(
    (nodeId: string, value: string | number) => {
      setDrawerState((prev) => {
        if (!prev.nodeType) return prev;
        const newData: CustomNodeData =
          prev.nodeType === 'textUpdater'
            ? { ...prev.data, value: value as string }
            : { ...prev.data, value: value as number };
        return { ...prev, data: newData };
      });

      setNodes((nds) =>
        nds.map((n) => {
          if (n.id !== nodeId) return n;
          if (n.type === 'textUpdater') {
            return {
              ...n,
              data: { ...n.data, value: value as string } as TextNodeData,
            } as Node<TextNodeData, 'textUpdater'>;
          }
          return {
            ...n,
            data: { ...n.data, value: value as number } as NumberNodeData,
          } as Node<NumberNodeData, 'number'>;
        }),
      );
    },
    [setNodes],
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
            <LeftSquareOutlined className="back-icon" />
            <div>当前流程</div>
          </div>
          <div className="topBar-right">
            <Button type="primary" onClick={checkFlowData}>
              流程图数据
            </Button>
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
          onNodeClick={(_, node) =>
            openDrawer(node.type as NodeType, node.id, node.data)
          }
          fitView
          style={{ backgroundColor: '#F7F9FB' }}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background />
        </ReactFlow>
        {drawerState.nodeType && (
          <NodeTab
            open={drawerState.open}
            setOpen={setDrawerOpen}
            nodeType={drawerState.nodeType}
            nodeId={drawerState.nodeId}
            data={drawerState.data}
            onUpdate={(value) => updateNodeData(drawerState.nodeId, value)}
          />
        )}
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