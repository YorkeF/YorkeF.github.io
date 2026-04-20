export interface VirtualNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  children?: VirtualNode[];
  expanded?: boolean;
}

export interface TabItem {
  path: string;
  name: string;
}

export interface TerminalEntry {
  type: 'command' | 'output' | 'error' | 'info';
  text: string;
}
