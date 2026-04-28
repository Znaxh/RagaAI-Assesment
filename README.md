
# Frontend Assessment — B2B Healthcare SaaS

## OVERVIEW // SYSTEM BRIEF
- Dark-only, terminal-inspired healthcare operations dashboard.
- React + TypeScript SPA with protected routes, patient analytics, and alert simulation.
- UI language follows monospace-first "MODULE_NAME // SUBSECTION" conventions.

## TECH STACK // MODULES
| Layer | Stack |
| --- | --- |
| Frontend | React 18 + TypeScript + Vite |
| Routing | React Router v6 |
| State | Zustand |
| Data Fetching | TanStack Query |
| Auth | Firebase Authentication (email/password) |
| Charts | Recharts |
| Styling | Tailwind CSS + custom CSS variables |
| Icons | Lucide React |
| Motion | Framer Motion |

## PREREQUISITES // ENVIRONMENT
- Node.js 18+
- npm 9+
- Firebase project with Email/Password auth enabled

## SETUP // BOOT_SEQUENCE
1. Clone repository:
   `git clone <repo-url>`
2. Enter project:
   `cd RAGA-AI_Assesment`
3. Install dependencies:
   `npm install`
4. Copy env template:
   `cp .env.example .env`
5. Fill Firebase keys in `.env`.
6. Start dev server:
   `npm run dev`
7. Build production bundle:
   `npm run build`

## FIREBASE // AUTH_SETUP
1. Open [Firebase Console](https://console.firebase.google.com/).
2. Create/select project.
3. Add a web app and copy config values.
4. Enable **Authentication > Sign-in method > Email/Password**.
5. Create demo account:
   - Email: `demo@healthcare.com`
   - Password: `Demo@1234`
6. Add values to `.env`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`

## FEATURE CHECKLIST // STATUS
- [x] Dark terminal-style design system (global CSS variables)
- [x] Protected routes with auth-gated app shell
- [x] Dashboard hero cards with DotGrid + responsive layouts
- [x] Analytics charts (line, area, bar, donut)
- [x] Patient explorer with grid/list toggle + modal
- [x] Service worker registration + notification permission flow
- [x] Alert simulation trigger and notification panel
- [x] Lazy loaded pages + suspense fallback
- [x] Mobile responsiveness with drawer-style sidebar
- [x] Full E2E suite and visual regression snapshots (Playwright)

## DEMO ACCESS // CREDENTIALS
- `demo@healthcare.com`
- `Demo@1234`


## FOLDER STRUCTURE // MAP
```text
src/
  components/
  hooks/
  pages/
  router/
  services/
  store/
  types/
public/
  sw.js
```

## DEPLOYMENT // VERCEL
1. Push repo to GitHub.
2. Import project in Vercel.
3. Framework preset: `Vite`.
4. Add all `VITE_FIREBASE_*` environment variables in Vercel project settings.
5. Deploy.

## SCREENSHOTS // PLACEHOLDERS
- Dashboard (desktop)
- Analytics (desktop)
- Patients grid/list (desktop + mobile)
- Login screen

## KNOWN LIMITATIONS // NOTES
- Firebase auth is configured; full CRUD/data sync still uses local mock data.
- Notifications are local/browser-based and require browser permission.
- Responsive behavior implemented; final pixel-perfect validation should be done against your recording at 768px and 375px breakpoints.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
