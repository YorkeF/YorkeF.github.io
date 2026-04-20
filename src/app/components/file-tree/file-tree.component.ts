import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { IdeService } from '../../services/ide.service';
import { VirtualNode } from '../../models/file-system.model';

export interface FlatNode {
  node: VirtualNode;
  depth: number;
}

@Component({
  selector: 'app-file-tree',
  standalone: true,
  imports: [],
  templateUrl: './file-tree.component.html',
  styleUrl: './file-tree.component.scss'
})
export class FileTreeComponent {
  private ide = inject(IdeService);

  readonly flatNodes = toSignal(
    this.ide.fileSystem$.pipe(map(nodes => this.flatten(nodes, 0))),
    { initialValue: [] as FlatNode[] }
  );

  readonly activeTabPath = toSignal(this.ide.activeTabPath$, { initialValue: null });

  private flatten(nodes: VirtualNode[], depth: number): FlatNode[] {
    const result: FlatNode[] = [];
    for (const node of nodes) {
      result.push({ node, depth });
      if (node.type === 'folder' && node.expanded && node.children) {
        result.push(...this.flatten(node.children, depth + 1));
      }
    }
    return result;
  }

  onNodeClick(node: VirtualNode): void {
    if (node.type === 'folder') {
      this.ide.toggleFolder(node.path);
    } else {
      this.ide.openFile(node.path);
    }
  }

  indent(depth: number): string {
    return `${depth * 14}px`;
  }
}
