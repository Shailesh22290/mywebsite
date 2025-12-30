# Portfolio — Shailesh K.

Public repository for a fast, animated React + Vite portfolio site showcasing projects, blog posts, talks, publications, experience, and consultancy/services.

Live demo: https://shailesh22290.github.io

Quick summary
- Tech: React, Vite, Tailwind CSS, Framer Motion
- Purpose: Personal portfolio + consultancy landing with searchable content and rich UI
- Static site — suitable for Netlify, Vercel or GitHub Pages

Top features
- Projects: data-driven project cards, gallery images, modal detail view, links to Live / Code / Paper
- Client-side Global Search: in-memory search across projects, blog, talks and experience
- Blog / Posts: local JSON and data-driven posts (public/posts.json + src/data/blog.js)
- Talks & Publications: listings with filters and direct links
- Experience & Education: timeline and cards with responsibilities / certificates
- Consultancy / Services pages: service cards, testimonials and CTA banners
- Contact form: EmailJS integration (env keys) + social links
- Visual polish: animated hero, global background, data-science preloader (framer-motion & SVGs)
- Utilities: custom hooks (debounce, intersection), API wrapper, helper utils
- Accessibility: keyboard-friendly controls, ARIA attributes on interactive elements

Where to edit content (single-source of truth)
- Personal info / Bio: src/data/personal.js
- Projects: src/data/projects.js (images in public/assets/)
- Blog posts: src/data/blog.js and public/posts.json
- Talks: src/data/talks.js
- Publications: src/data/publications.js (or components under src/components/sections/Publications)
- Experience / Education / Certificates: src/data/experience.js, src/data/education.js

Key UI components (common locations)
- App entry: src/main.jsx
- Layout + footer: src/components/common/Layout/Layout.jsx
- Hero & preloader: src/components/sections/Home/Hero.jsx and src/components/common/UI/DataSciencePreloader.jsx
- Projects list, cards, modal: src/components/sections/Projects/Projects.jsx, ProjectCard.jsx, ProjectModal.jsx
- Global Search: src/components/features/Search/GlobalSearch.jsx
- Contact form: src/components/sections/Contact/Contact.jsx, ContactForm.jsx
- Styles: src/index.css and src/styles/*, Tailwind config in tailwind.config.js

Development (Windows / PowerShell)
1. Install
   npm install
2. Run dev server
   npm run dev
3. Build
   npm run build
4. Preview production build
   npm run preview

Environment & deployment
- Secrets: add EmailJS (and any other) keys to .env — see .env.example. Do NOT commit .env.
- Deploy: static output from `npm run build`. Use Netlify/Vercel/GitHub Actions for CI/CD. netlify.toml included if using Netlify.

Editing tips
- Add a project: update src/data/projects.js and add images to public/assets/, then verify project id and links.
- Add a blog post: add to src/data/blog.js or public/posts.json (if used by search).
- Change search indexing: edit GlobalSearch.jsx to include new data sources or fields.

Testing & linting
- See package.json for any test or lint scripts. Add unit tests under src/__tests__ as needed.

Contributing
- Fork, create a branch, open a PR. Describe content edits or UI changes and include screenshots for visual updates.


Need help?
Open an issue or PR with the change you want and reference the file(s) above. Follow the Editing tips for quick