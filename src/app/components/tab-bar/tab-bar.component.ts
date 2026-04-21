import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IdeService, IMAGE_EXTS } from '../../services/ide.service';

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [],
  templateUrl: './tab-bar.component.html',
  styleUrl: './tab-bar.component.scss'
})
export class TabBarComponent {
  private ide = inject(IdeService);

  readonly tabs = toSignal(this.ide.openTabs$, { initialValue: [] });
  readonly activeTabPath = toSignal(this.ide.activeTabPath$, { initialValue: null });

  onTabClick(path: string): void {
    this.ide.activeTabPath$.next(path);
  }

  onTabClose(event: MouseEvent, path: string): void {
    event.stopPropagation();
    this.ide.closeTab(path);
  }

  isMd(name: string):    boolean { return name.endsWith('.md'); }
  isImage(name: string): boolean { return IMAGE_EXTS.test(name); }
  isJson(name: string):  boolean { return name.endsWith('.json'); }
}
