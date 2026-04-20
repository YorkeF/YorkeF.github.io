# yferrell.dev

A portfolio site that looks and behaves like a JetBrains IDE. Built with Angular 21, deployed to GitHub Pages at [yferrell.dev](https://yferrell.dev).

## Concept

Instead of a traditional portfolio, this site renders as a fully interactive JetBrains New UI Dark IDE. Portfolio content is organised into folders in a file tree — clicking a file opens it in a tabbed editor with syntax-highlighted markdown. A fake bash terminal at the bottom lets you navigate the file system with `ls`, `cd`, `cat`, and other commands.

## Updating Content

All portfolio content lives in `src/app/data/`. Each file exports a `Record<filename, markdownString>`:

| File | Folder in the IDE |
|---|---|
| `about.data.ts` | `about.md` at the root level |
| `education.data.ts` | `education/` |
| `experience.data.ts` | `experience/` |
| `projects.data.ts` | `projects/` |

Add a new entry by adding a key/value pair to the relevant file. The file tree and terminal update automatically — no other changes needed.

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
