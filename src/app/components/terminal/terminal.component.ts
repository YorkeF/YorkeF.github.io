import {
  Component, inject, signal, ElementRef, ViewChild,
  AfterViewChecked, OnInit
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IdeService } from '../../services/ide.service';
import { TerminalEntry } from '../../models/file-system.model';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent implements OnInit, AfterViewChecked {
  private ide = inject(IdeService);

  @ViewChild('scrollArea') scrollArea!: ElementRef<HTMLDivElement>;
  @ViewChild('cmdInput')   cmdInput!:   ElementRef<HTMLInputElement>;

  readonly entries = signal<TerminalEntry[]>([]);
  readonly currentInput = signal('');

  readonly cwd = toSignal(this.ide.currentDirectory$, { initialValue: '~/portfolio' });

  private history: string[] = [];
  private historyIdx = -1;
  private needsScroll = false;

  ngOnInit(): void {
    this.addEntry('info', 'Portfolio Terminal  —  type \'help\' for available commands');
    this.addEntry('output', '');
  }

  ngAfterViewChecked(): void {
    if (this.needsScroll) {
      const el = this.scrollArea?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
      this.needsScroll = false;
    }
  }

  get prompt(): string {
    return `yorke@portfolio:${this.cwd()}$ `;
  }

  focusInput(): void {
    this.cmdInput?.nativeElement.focus();
  }

  onInput(event: Event): void {
    this.currentInput.set((event.target as HTMLInputElement).value);
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        this.execute(this.currentInput());
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateHistory(1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.navigateHistory(-1);
        break;
    }
  }

  private navigateHistory(dir: number): void {
    if (!this.history.length) return;
    this.historyIdx = Math.max(-1, Math.min(this.history.length - 1, this.historyIdx + dir));
    this.currentInput.set(
      this.historyIdx === -1 ? '' : this.history[this.history.length - 1 - this.historyIdx]
    );
  }

  private execute(raw: string): void {
    const input = raw.trim();
    this.addEntry('command', this.prompt + input);
    if (input) {
      this.history.push(input);
      this.historyIdx = -1;
      this.runCommand(input);
    }
    this.currentInput.set('');
    this.needsScroll = true;
  }

  private runCommand(cmd: string): void {
    const [command, ...args] = cmd.split(/\s+/);

    switch (command.toLowerCase()) {
      case 'help':    this.cmdHelp(); break;
      case 'ls':      this.cmdLs(args[0]); break;
      case 'cd':      this.cmdCd(args[0] ?? ''); break;
      case 'pwd':     this.addEntry('output', this.ide.currentDirectory$.value); break;
      case 'cat':     this.cmdCat(args[0]); break;
      case 'clear':   this.entries.set([]); break;
      case 'whoami':  this.addEntry('output', 'yorke'); break;
      case 'echo':    this.addEntry('output', args.join(' ')); break;
      default:
        this.addEntry('error', `bash: ${command}: command not found`);
    }
    this.addEntry('output', '');
  }

  private cmdHelp(): void {
    this.addEntry('output', 'Available commands:');
    this.addEntry('output', '');
    const cmds: [string, string][] = [
      ['ls [path]',  'List directory contents'],
      ['cd <path>',  'Change directory (supports ..)'],
      ['pwd',        'Print working directory'],
      ['cat <file>', 'Open file in editor and preview'],
      ['clear',      'Clear the terminal'],
      ['whoami',     'Print current user'],
      ['echo <...>', 'Print arguments'],
      ['help',       'Show this help'],
    ];
    for (const [c, d] of cmds) {
      this.addEntry('output', `  ${c.padEnd(20)}${d}`);
    }
  }

  private cmdLs(arg?: string): void {
    const cwd = this.ide.currentDirectory$.value;
    const target = arg ? this.ide.resolvePath(cwd, arg) : cwd;
    const children = this.ide.getChildren(target);

    if (!children.length) {
      const node = this.ide.getNode(target);
      if (!node) {
        this.addEntry('error', `ls: cannot access '${arg}': No such file or directory`);
        return;
      }
    }

    const out = children.map(n => n.type === 'folder' ? n.name + '/' : n.name).join('   ');
    if (out) this.addEntry('output', out);
  }

  private cmdCd(arg: string): void {
    const cwd = this.ide.currentDirectory$.value;
    const target = this.ide.resolvePath(cwd, arg);
    const node = this.ide.getNode(target);

    if (!node) {
      this.addEntry('error', `bash: cd: ${arg || '~'}: No such file or directory`);
    } else if (node.type !== 'folder') {
      this.addEntry('error', `bash: cd: ${arg}: Not a directory`);
    } else {
      this.ide.currentDirectory$.next(target);
    }
  }

  private cmdCat(filename?: string): void {
    if (!filename) {
      this.addEntry('error', 'cat: missing operand');
      return;
    }
    const cwd = this.ide.currentDirectory$.value;
    const target = this.ide.resolvePath(cwd, filename);
    const node = this.ide.getNode(target);

    if (!node) {
      this.addEntry('error', `cat: ${filename}: No such file or directory`);
    } else if (node.type === 'folder') {
      this.addEntry('error', `cat: ${filename}: Is a directory`);
    } else {
      this.ide.openFile(target);
      const lines = (node.content ?? '').split('\n');
      const preview = lines.slice(0, 10);
      for (const l of preview) this.addEntry('output', l);
      if (lines.length > 10) {
        this.addEntry('output', '...');
        this.addEntry('output', `(${lines.length} lines — opened in editor)`);
      }
    }
  }

  private addEntry(type: TerminalEntry['type'], text: string): void {
    this.entries.update(e => [...e, { type, text }]);
    this.needsScroll = true;
  }
}
