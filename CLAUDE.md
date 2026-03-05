# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Type-check + build for production (tsc -b && vite build)
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

No test suite is configured.

To add shadcn components: `npx shadcn add <component>`

## Architecture

This is a React 19 + TypeScript + Vite SPA — a UI prototype for a cyon.ch web hosting control panel.

### Key layers

- **`src/App.tsx`** — Root. Sets up `RouterProvider` and `DirectionProvider` (Radix UI, supports RTL for Arabic). Updates `<html dir>` and `<html lang>` on language change.
- **`src/routes.ts`** — React Router v7 config. Single root route: `Layout` wraps all page children via `<Outlet>`.
- **`src/pages/layout.tsx`** — Shell: `Header` (top bar) + `Sidebar` (xl breakpoint only, stub) + scrollable content area.
- **`src/pages/`** — Page components rendered into the layout outlet.
- **`src/components/layout/`** — `Header`, `Sidebar`, `LanguageToggle` (dropdown with flag-icons).
- **`src/components/navigation/`** — `TopNav` (desktop + mobile variants), `TopNavLink` (nav item with optional badge).
- **`src/components/ui/`** — shadcn-style primitives built on Radix UI: `Button`, `Badge`, `Switch`, `NavigationMenu`, `DropdownMenu`, `Typography`. Use CVA (`class-variance-authority`) for variants.
- **`src/lib/utils.ts`** — `cn()` (clsx + tailwind-merge) and `startCase()` for display text.

### i18n

- `src/i18n.ts` — i18next + react-i18next + browser language detector. Single namespace: `common`. Default language: `en`.
- Translation files: `src/locales/{en,de,vn}/common.json`
- All user-facing strings go through `t("key")`, wrapped with `startCase()` for display formatting.
- Arabic RTL is stubbed out (commented in `language-toggle.tsx`); direction is driven by `i18n.language === "ar"` in `App.tsx`.

### Styling

- Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js`).
- Path alias `@/` resolves to `src/`.
- `cn()` from `src/lib/utils.ts` is the standard way to merge class names.
- `tw-animate-css` and `prettier-plugin-tailwindcss` are in use.

### React Compiler

`babel-plugin-react-compiler` is enabled in Vite config — avoid manual `useMemo`/`useCallback` unless there is a specific reason.
