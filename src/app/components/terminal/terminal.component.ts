import {
  Component, inject, signal, computed, ElementRef, ViewChild,
  AfterViewChecked, OnInit, Output, EventEmitter
} from '@angular/core';
import { IdeService, IMAGE_EXTS } from '../../services/ide.service';
import { TerminalEntry } from '../../models/file-system.model';

interface SessionData {
  id: number;
  label: string;
  entries: TerminalEntry[];
  history: string[];
  historyIdx: number;
  cwd: string;
  currentInput: string;
}

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

  @Output() requestHide = new EventEmitter<void>();

  readonly sessions  = signal<SessionData[]>([this.createSession(1)]);
  readonly activeId  = signal<number>(1);
  readonly activeSession = computed(() =>
    this.sessions().find(s => s.id === this.activeId())!
  );

  private nextId    = 2;
  private needsScroll = false;

  private createSession(id: number): SessionData {
    return {
      id,
      label: id === 1 ? 'Local' : `Local (${id})`,
      entries: [],
      history: [],
      historyIdx: -1,
      cwd: '~/portfolio',
      currentInput: '',
    };
  }

  ngOnInit(): void {
    this.pushEntry('info', "Portfolio Terminal  —  type 'help' for available commands");
    this.pushEntry('output', '');
  }

  ngAfterViewChecked(): void {
    if (this.needsScroll) {
      const el = this.scrollArea?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
      this.needsScroll = false;
    }
  }

  get prompt(): string {
    return `yorke@portfolio:${this.activeSession().cwd}$ `;
  }

  // ── Tab management ──────────────────────────────────────────────────────────

  setActive(id: number): void {
    this.activeId.set(id);
    this.needsScroll = true;
    setTimeout(() => this.cmdInput?.nativeElement.focus());
  }

  addSession(): void {
    const id      = this.nextId++;
    const session = this.createSession(id);
    session.entries = [
      { type: 'info',   text: "Portfolio Terminal  —  type 'help' for available commands" },
      { type: 'output', text: '' },
    ];
    this.sessions.update(s => [...s, session]);
    this.activeId.set(id);
    this.needsScroll = true;
    setTimeout(() => this.cmdInput?.nativeElement.focus());
  }

  closeSession(id: number): void {
    const all  = this.sessions();
    const idx  = all.findIndex(s => s.id === id);
    const next = all.filter(s => s.id !== id);
    if (!next.length) {
      this.sessions.set([]);
      this.requestHide.emit();
      return;
    }
    this.sessions.set(next);
    if (this.activeId() === id) {
      this.activeId.set(next[Math.min(idx, next.length - 1)].id);
    }
    this.needsScroll = true;
  }

  /** Called by the app when the terminal panel is shown with no open sessions. */
  ensureSession(): void {
    if (!this.sessions().length) {
      this.nextId = 2;
      const session = this.createSession(1);
      session.entries = [
        { type: 'info',   text: "Portfolio Terminal  —  type 'help' for available commands" },
        { type: 'output', text: '' },
      ];
      this.sessions.set([session]);
      this.activeId.set(1);
      this.needsScroll = true;
    }
  }

  // ── Input handling ───────────────────────────────────────────────────────────

  focusInput(): void {
    this.cmdInput?.nativeElement.focus();
  }

  onInput(event: Event): void {
    this.mutate(s => s.currentInput = (event.target as HTMLInputElement).value);
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
        this.execute(this.activeSession().currentInput);
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
    const s = this.activeSession();
    if (!s.history.length) return;
    this.mutate(s => {
      s.historyIdx = Math.max(-1, Math.min(s.history.length - 1, s.historyIdx + dir));
      s.currentInput = s.historyIdx === -1 ? '' : s.history[s.history.length - 1 - s.historyIdx];
    });
    this.syncInputElement();
  }

  private execute(raw: string): void {
    const input = raw.trim();
    this.pushEntry('command', this.prompt + input);
    if (input) {
      this.mutate(s => { s.history.push(input); s.historyIdx = -1; });
      this.runCommand(input);
    }
    this.mutate(s => s.currentInput = '');
    this.syncInputElement();
    this.needsScroll = true;
  }

  // ── Commands ─────────────────────────────────────────────────────────────────

  private runCommand(cmd: string): void {
    const [command, ...args] = cmd.split(/\s+/);
    switch (command.toLowerCase()) {
      case 'help':    this.cmdHelp(); break;
      case 'ls':      this.cmdLs(args[0]); break;
      case 'cd':      this.cmdCd(args[0] ?? ''); break;
      case 'pwd':     this.pushEntry('output', this.activeSession().cwd); break;
      case 'cat':     this.cmdCat(args[0]); break;
      case 'clear':   this.mutate(s => s.entries = []); break;
      case 'whoami':  this.pushEntry('output', 'yorke'); break;
      case 'echo':    this.pushEntry('output', args.join(' ')); break;
      default:
        this.pushEntry('error', `bash: ${command}: command not found`);
    }
    this.pushEntry('output', '');
  }

  private cmdHelp(): void {
    this.pushEntry('output', 'Available commands:');
    this.pushEntry('output', '');
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
    for (const [c, d] of cmds) this.pushEntry('output', `  ${c.padEnd(20)}${d}`);
  }

  private cmdLs(arg?: string): void {
    const cwd      = this.activeSession().cwd;
    const target   = arg ? this.ide.resolvePath(cwd, arg) : cwd;
    const children = this.ide.getChildren(target);
    if (!children.length && !this.ide.getNode(target)) {
      this.pushEntry('error', `ls: cannot access '${arg}': No such file or directory`);
      return;
    }
    const out = children.map(n => n.type === 'folder' ? n.name + '/' : n.name).join('   ');
    if (out) this.pushEntry('output', out);
  }

  private cmdCd(arg: string): void {
    const cwd    = this.activeSession().cwd;
    const target = this.ide.resolvePath(cwd, arg);
    const node   = this.ide.getNode(target);
    if (!node) {
      this.pushEntry('error', `bash: cd: ${arg || '~'}: No such file or directory`);
    } else if (node.type !== 'folder') {
      this.pushEntry('error', `bash: cd: ${arg}: Not a directory`);
    } else {
      this.mutate(s => s.cwd = target);
    }
  }

  private cmdCat(filename?: string): void {
    if (!filename) { this.pushEntry('error', 'cat: missing operand'); return; }
    const cwd    = this.activeSession().cwd;
    const target = this.ide.resolvePath(cwd, filename);
    const node   = this.ide.getNode(target);
    if (!node) {
      this.pushEntry('error', `cat: ${filename}: No such file or directory`);
    } else if (node.type === 'folder') {
      this.pushEntry('error', `cat: ${filename}: Is a directory`);
    } else if (IMAGE_EXTS.test(node.name)) {
      this.ide.openFile(target);
      this.pushEntry('output', `[image: ${node.name} — opened in editor]`);
    } else {
      this.ide.openFile(target);
      const content = this.ide.getContent(target);
      if (content !== null) {
        const lines = content.split('\n');
        for (const l of lines.slice(0, 10)) this.pushEntry('output', l);
        if (lines.length > 10) {
          this.pushEntry('output', '...');
          this.pushEntry('output', `(${lines.length} lines — opened in editor)`);
        }
      } else {
        this.pushEntry('output', `Opening ${node.name} in editor…`);
      }
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────

  /** Mutate the active session in-place and trigger signal update. */
  private mutate(fn: (s: SessionData) => void): void {
    const all = this.sessions();
    fn(all.find(s => s.id === this.activeId())!);
    this.sessions.set([...all]);
  }

  /** Push an entry into the active session's log. */
  private pushEntry(type: TerminalEntry['type'], text: string): void {
    this.mutate(s => s.entries.push({ type, text }));
    this.needsScroll = true;
  }

  /** Force the <input> element's displayed value to match session state. */
  private syncInputElement(): void {
    const el = this.cmdInput?.nativeElement;
    if (el) el.value = this.activeSession().currentInput;
  }
}
