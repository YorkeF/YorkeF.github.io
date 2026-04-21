import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { IdeService } from '../../services/ide.service';

@Component({
  selector: 'app-status-bar',
  standalone: true,
  imports: [],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss'
})
export class StatusBarComponent {
  private ide = inject(IdeService);

  readonly breadcrumbs = toSignal(
    this.ide.activeTabPath$.pipe(
      map(p => p ? p.replace('~/', '').split('/').filter(Boolean) : [])
    ),
    { initialValue: [] as string[] }
  );

  readonly activeFileName = toSignal(
    this.ide.activeTabPath$.pipe(map(p => p?.split('/').pop() ?? null)),
    { initialValue: null as string | null }
  );
}
