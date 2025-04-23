import { Node } from '@xyflow/react';

export interface TextNodeData {
  label?: string;
  value: string;
  [key: string]: unknown;
}

export interface NumberNodeData {
  label?: string;
  value: number;
  [key: string]: unknown;
}

export type CustomNodeData = TextNodeData | NumberNodeData;

export type NodeType = 'textUpdater' | 'number';

export type CustomNode =
  | Node<TextNodeData, 'textUpdater'>
  | Node<NumberNodeData, 'number'>;