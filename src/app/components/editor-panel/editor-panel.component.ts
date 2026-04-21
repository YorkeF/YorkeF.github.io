import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IdeService, IMAGE_EXTS } from '../../services/ide.service';
import { highlightMarkdownLine } from '../../utils/markdown-highlight';

interface EditorLine {
  number: number;
  html: SafeHtml;
}

@Component({
  selector: 'app-editor-panel',
  standalone: true,
  imports: [],
  templateUrl: './editor-panel.component.html',
  styleUrl: './editor-panel.component.scss'
})
export class EditorPanelComponent {
  private ide       = inject(IdeService);
  private sanitizer = inject(DomSanitizer);

  private readonly activeTabPath = toSignal(this.ide.activeTabPath$, {
    initialValue: null as string | null,
  });

  private readonly activeContent = toSignal(
    combineLatest([this.ide.activeTabPath$, this.ide.contentCache$]).pipe(
      map(([path]) => (path ? this.ide.getContent(path) : null))
    ),
    { initialValue: null as string | null }
  );

  /** True when the active file is an image. */
  readonly isImage = computed(() => {
    const p = this.activeTabPath();
    return p ? IMAGE_EXTS.test(p) : false;
  });

  /** URL to pass to <img> when isImage is true. */
  readonly imageSrc = computed(() =>
    this.isImage() ? this.ide.imageUrl(this.activeTabPath()!) : null
  );

  /** True when a non-image file is open but content hasn't arrived yet. */
  readonly loading = computed(() => {
    const p = this.activeTabPath();
    return !!p && !this.isImage() && this.activeContent() === null;
  });

  readonly lines = computed<EditorLine[]>(() => {
    const content = this.activeContent();
    if (!content) return [];
    return content.split('\n').map((line, i) => ({
      number: i + 1,
      html: this.sanitizer.bypassSecurityTrustHtml(highlightMarkdownLine(line)),
    }));
  });
}
