import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VirtualNode, TabItem } from '../models/file-system.model';
import { aboutContent } from '../data/about.data';
import { educationContent } from '../data/education.data';
import { experienceContent } from '../data/experience.data';
import { projectsContent } from '../data/projects.data';

@Injectable({ providedIn: 'root' })
export class IdeService {
  private readonly root: VirtualNode = this.buildFileSystem();

  readonly fileSystem$ = new BehaviorSubject<VirtualNode[]>([this.root]);
  readonly openTabs$ = new BehaviorSubject<TabItem[]>([
    { path: '~/portfolio/about.md', name: 'about.md' }
  ]);
  readonly activeTabPath$ = new BehaviorSubject<string | null>('~/portfolio/about.md');
  readonly currentDirectory$ = new BehaviorSubject<string>('~/portfolio');

  private buildFileSystem(): VirtualNode {
    const makeFiles = (folder: string, data: Record<string, string>): VirtualNode[] =>
      Object.entries(data).map(([name, content]) => ({
        name,
        path: `~/portfolio/${folder}/${name}`,
        type: 'file' as const,
        content
      }));

    return {
      name: 'portfolio',
      path: '~/portfolio',
      type: 'folder',
      expanded: true,
      children: [
        ...Object.entries(aboutContent).map(([name, content]) => ({
          name,
          path: `~/portfolio/${name}`,
          type: 'file' as const,
          content
        })),
        {
          name: 'education',
          path: '~/portfolio/education',
          type: 'folder',
          expanded: false,
          children: makeFiles('education', educationContent)
        },
        {
          name: 'experience',
          path: '~/portfolio/experience',
          type: 'folder',
          expanded: false,
          children: makeFiles('experience', experienceContent)
        },
        {
          name: 'projects',
          path: '~/portfolio/projects',
          type: 'folder',
          expanded: false,
          children: makeFiles('projects', projectsContent)
        }
      ]
    };
  }

  openFile(path: string): void {
    const node = this.getNode(path);
    if (!node || node.type !== 'file') return;
    const tabs = this.openTabs$.value;
    if (!tabs.some(t => t.path === path)) {
      this.openTabs$.next([...tabs, { path, name: node.name }]);
    }
    this.activeTabPath$.next(path);
  }

  closeTab(path: string): void {
    const tabs = this.openTabs$.value;
    const idx = tabs.findIndex(t => t.path === path);
    if (idx === -1) return;
    const newTabs = tabs.filter(t => t.path !== path);
    this.openTabs$.next(newTabs);
    if (this.activeTabPath$.value === path) {
      const next = newTabs[Math.min(idx, newTabs.length - 1)];
      this.activeTabPath$.next(next?.path ?? null);
    }
  }

  toggleFolder(path: string): void {
    const node = this.findNode(path, this.root);
    if (node?.type === 'folder') {
      node.expanded = !node.expanded;
      this.fileSystem$.next([...this.fileSystem$.value]);
    }
  }

  getNode(path: string): VirtualNode | null {
    return this.findNode(path, this.root);
  }

  getChildren(path: string): VirtualNode[] {
    return this.findNode(path, this.root)?.children ?? [];
  }

  resolvePath(cwd: string, input: string): string {
    if (!input || input === '~') return '~/portfolio';
    if (input.startsWith('~/')) return input;
    if (input === '..') {
      const parts = cwd.split('/');
      if (parts.length <= 2) return '~/portfolio';
      parts.pop();
      return parts.join('/');
    }
    return `${cwd}/${input}`;
  }

  private findNode(path: string, node: VirtualNode): VirtualNode | null {
    if (node.path === path) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = this.findNode(path, child);
        if (found) return found;
      }
    }
    return null;
  }
}
