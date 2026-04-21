# yferrell.dev

A portfolio site that looks and behaves like a JetBrains IDE. Built with Angular 21, deployed to GitHub Pages at [yferrell.dev](https://yferrell.dev).

## Concept

Instead of a traditional portfolio, this site renders as a fully interactive JetBrains New UI Dark IDE. Portfolio content is organised into folders in a file tree — clicking a file opens it in a tabbed editor with syntax-highlighted markdown. A fake bash terminal at the bottom lets you navigate the file system with `ls`, `cd`, `cat`, and other commands.

## Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Toolbar  [logo · hamburger · project · branch]   [run·debug·search] [×]│
├────┬────────────────────────────────────────────────────────────────────┤
│    │  TabBarComponent                                                    │
│    ├──────────────────────────────────────┬──────────────────────────── │
│ A  │                                      │                             │
│ c  │  FileTreeComponent                   │  EditorPanelComponent       │
│ t  │  (project panel)                     │  (line numbers + markdown)  │
│ i  │                                      │                             │
│ v  ├──────────────────────────────────────┴─────────────────────────────│
│ i  │  TerminalComponent  (full width, fake bash)                        │
│ t  │                                                                    │
│ y  │                                                                    │
├────┴────────────────────────────────────────────────────────────────────┤
│  StatusBarComponent  [breadcrumb path]              [UTF-8 · LF · Ln 1] │
└─────────────────────────────────────────────────────────────────────────┘
```

The project panel and terminal can each be toggled via the activity bar icons on the left. The divider between the project panel and editor, and the divider above the terminal, are both draggable to resize.

## Updating Portfolio Content

All content lives in `public/content/` as real files. The folder structure you create there is exactly what appears in the IDE's file tree.

```
public/content/
├── about.md
├── education/
│   ├── bachelors_computer_science.md
│   └── aws_certified_developer.md
├── experience/
│   └── senior_frontend_engineer.md
└── projects/
    └── portfolio_ide.md
```

**Supported file types:**
- `.md` / `.txt` — rendered with syntax highlighting in the editor
- `.png`, `.jpg`, `.gif`, `.webp`, `.svg` and other images — displayed as an image viewer
- Any other file type — displayed as plain text

### Adding a file

Drop a file anywhere inside `public/content/`. Then run `npm start` (or `npm run build`) — the manifest is regenerated automatically via a pre-script, and the new file appears in the file tree.

### Adding a folder

Create a subfolder inside `public/content/`. It will appear as a collapsible folder in the file tree.

### Removing a file or folder

Delete it from `public/content/` and restart the dev server.

## Development

```bash
npm install
npm start        # dev server at localhost:4200
npm run build    # production build → dist/portfolio/browser/
npm test         # unit tests (Vitest)
```

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that builds the project and deploys `dist/portfolio/browser` to GitHub Pages. The custom domain is configured via the `CNAME` file.

## Tech Stack

- [Angular 21](https://angular.dev) — standalone components, signals, RxJS
- SCSS with CSS custom properties for the JetBrains New UI Dark theme
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts
- GitHub Pages + GitHub Actions
