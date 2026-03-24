
Personal portfolio site, hosted on GitHub Pages at [yorkeferrell.com](https://yorkeferrell.com).

---

## Concept

A minimal, static portfolio hub that serves as the central landing page for my work. It summarizes my experience, education, and skills, and links out to independent project sites hosted on subdomains of `yorkeferrell.com`. Each project lives in its own repository and is deployed separately.

---

## Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** CSS Modules with CSS custom properties
- **Routing:** React Router v6
- **Hosting:** GitHub Pages with custom domain

---

## Project Structure

```
src/
├── main.tsx                  # React entry point
├── App.tsx                   # Root component with routes
├── vite-env.d.ts             # CSS modules + Vite type declarations
├── types/
│   └── index.ts              # Shared TypeScript interfaces
├── styles/
│   └── globals.css           # CSS variables and base reset
├── components/
│   ├── index.ts              # Barrel exports
│   ├── common/
│   │   ├── Header.tsx        # Sticky top nav bar
│   │   ├── Footer.tsx        # Page footer
│   │   └── Navigation.tsx    # Nav links with active state
│   └── portfolio/
│       ├── ExperienceList.tsx   # Renders a list of ExperienceEntry
│       ├── ExperienceEntry.tsx  # Single work experience item
│       ├── EducationList.tsx    # Renders a list of EducationEntry
│       ├── EducationEntry.tsx   # Single education item
│       ├── SkillsList.tsx       # Tagged skill group
│       └── ProjectCard.tsx      # Card linking to a project subdomain
└── pages/
    ├── Home.tsx              # Hero + work experience
    ├── About.tsx             # Bio, education, and skills
    └── Contact.tsx           # Email and GitHub links
```

---

## Pages

| Route | Page | Content |
|---|---|---|
| `/` | Home | Hero intro, full work experience |
| `/about` | About | Bio, education history, skills |
| `/contact` | Contact | Email and GitHub |

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → /dist
npm run preview   # preview production build locally
```

---

## Deployment

Pushing to `main` triggers GitHub Pages to deploy from the repository root. The `dist/` directory is excluded from version control — build output is not committed.

The site is served at [yorkeferrell.com](https://yorkeferrell.com) via DNS A records pointing to GitHub's servers.

---

## Projects

Independent project sites deployed to subdomains of `yorkeferrell.com`. Each is a separate GitHub repository with its own Vite + React + TypeScript setup.

| Project | Subdomain | Repository |
|---|---|---|
| *(coming soon)* | — | — |
