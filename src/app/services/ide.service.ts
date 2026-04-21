import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { VirtualNode, TabItem } from '../models/file-system.model';

interface ManifestNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: ManifestNode[];
}

export const IMAGE_EXTS = /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)$/i;

@Injectable({ providedIn: 'root' })
export class IdeService {
  private http = inject(HttpClient);

  private readonly root: VirtualNode = {
    name: 'portfolio',
    path: '~/portfolio',
    type: 'folder',
    expanded: true,
    children: [],
  };

  readonly fileSystem$      = new BehaviorSubject<VirtualNode[]>([this.root]);
  readonly openTabs$        = new BehaviorSubject<TabItem[]>([]);
  readonly activeTabPath$   = new BehaviorSubject<string | null>(null);
  readonly currentDirectory$ = new BehaviorSubject<string>('~/portfolio');

  // Reactive cache so components can derive content via combineLatest
  private readonly _cache   = new Map<string, string>();
  readonly contentCache$    = new BehaviorSubject<Map<string, string>>(new Map());

  constructor() {
    this.http.get<ManifestNode[]>('/manifest.json').subscribe({
      next: manifest => {
        this.root.children = this.buildTree(manifest, '~/portfolio');
        this.fileSystem$.next([this.root]);
        // Open about.md by default if it exists
        if (this.getNode('~/portfolio/about.md')) {
          this.openFile('~/portfolio/about.md');
        }
      },
      error: err => console.error('[IdeService] Failed to load manifest.json', err),
    });
  }

  private buildTree(nodes: ManifestNode[], parentPath: string): VirtualNode[] {
    return nodes.map(n => {
      const path = `${parentPath}/${n.name}`;
      if (n.type === 'folder') {
        return {
          name: n.name, path, type: 'folder' as const,
          expanded: false,
          children: this.buildTree(n.children ?? [], path),
        };
      }
      return { name: n.name, path, type: 'file' as const };
    });
  }

  openFile(path: string): void {
    const node = this.getNode(path);
    if (!node || node.type !== 'file') return;

    const tabs = this.openTabs$.value;
    if (!tabs.some(t => t.path === path)) {
      this.openTabs$.next([...tabs, { path, name: node.name }]);
    }
    this.activeTabPath$.next(path);

    // Images are displayed directly via URL — no text fetch needed
    if (IMAGE_EXTS.test(node.name)) return;

    if (!this._cache.has(path)) {
      const url = '/content/' + path.replace('~/portfolio/', '');
      this.http.get(url, { responseType: 'text' }).subscribe({
        next:  text  => this.setCache(path, text),
        error: ()    => this.setCache(path, `<!-- could not load ${node.name} -->`),
      });
    }
  }

  /** Returns cached text content, or null if not yet loaded. */
  getContent(path: string): string | null {
    return this._cache.get(path) ?? null;
  }

  /** URL to display an image file in the editor. */
  imageUrl(path: string): string {
    return '/content/' + path.replace('~/portfolio/', '');
  }

  closeTab(path: string): void {
    const tabs = this.openTabs$.value;
    const idx  = tabs.findIndex(t => t.path === path);
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

  private setCache(path: string, text: string): void {
    this._cache.set(path, text);
    this.contentCache$.next(new Map(this._cache));
  }

  private findNode(path: string, node: VirtualNode): VirtualNode | null {
    if (node.path === path) return node;
    for (const child of node.children ?? []) {
      const found = this.findNode(path, child);
      if (found) return found;
    }
    return null;
  }
}
