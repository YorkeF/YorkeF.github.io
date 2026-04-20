import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IdeService } from '../../services/ide.service';
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
  private ide = inject(IdeService);
  private sanitizer = inject(DomSanitizer);

  private readonly activeContent = toSignal(
    this.ide.activeTabPath$.pipe(
      map(path => (path ? (this.ide.getNode(path)?.content ?? null) : null))
    ),
    { initialValue: null as string | null }
  );

  readonly lines = computed<EditorLine[]>(() => {
    const content = this.activeContent();
    if (!content) return [];
    return content.split('\n').map((line, i) => ({
      number: i + 1,
      html: this.sanitizer.bypassSecurityTrustHtml(highlightMarkdownLine(line))
    }));
  });
}
