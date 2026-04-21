import { Component, inject, signal, HostListener } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { IdeService } from './services/ide.service';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { EditorPanelComponent } from './components/editor-panel/editor-panel.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileTreeComponent, TabBarComponent, EditorPanelComponent, TerminalComponent, StatusBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private ide = inject(IdeService);

  readonly activeFileName = toSignal(
    this.ide.activeTabPath$.pipe(map(p => p?.split('/').pop() ?? null)),
    { initialValue: null as string | null }
  );

  sidebarWidth   = signal(240);
  terminalHeight = signal(220);
  showProject    = signal(true);
  showTerminal   = signal(true);

  toggleProject(): void  { this.showProject.update(v => !v); }
  toggleTerminal(): void { this.showTerminal.update(v => !v); }

  closeWindow(): void {
    window.close();
  }

  maximizeWindow(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  minimizeWindow(): void {
    window.open('about:blank', '_blank');
  }

  private resizingSidebar  = false;
  private resizingTerminal = false;
  private startX = 0;
  private startY = 0;
  private startVal = 0;

  onSidebarDragStart(e: MouseEvent): void {
    this.resizingSidebar = true;
    this.startX   = e.clientX;
    this.startVal = this.sidebarWidth();
    e.preventDefault();
  }

  onTerminalDragStart(e: MouseEvent): void {
    this.resizingTerminal = true;
    this.startY   = e.clientY;
    this.startVal = this.terminalHeight();
    e.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (this.resizingSidebar) {
      const w = Math.max(160, Math.min(480, this.startVal + (e.clientX - this.startX)));
      this.sidebarWidth.set(w);
    }
    if (this.resizingTerminal) {
      const h = Math.max(80, Math.min(500, this.startVal - (e.clientY - this.startY)));
      this.terminalHeight.set(h);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.resizingSidebar  = false;
    this.resizingTerminal = false;
  }
}
