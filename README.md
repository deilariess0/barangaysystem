# Barangay Digital Hub — MVP

A responsive, white-theme Barangay Management System prototype built with React, Vite, TypeScript, React Router, Recharts, and Lucide icons. It is a **local-only demo**, not a secure production system.

## Features in this MVP

- Responsive admin shell with sidebar navigation and route-based pages.
- Dashboard summary cards, recent requests, announcements, quick actions, and age chart.
- Resident registry: search, add resident, and delete resident.
- Barangay Zensus: active population totals, age-group chart, distribution by purok, and recorded sex summary.
- Local demo views for households, service requests, certificates, complaints, blotter, payments, announcements, events, reports, user management, audit logs, and settings.
- Seeded sample records, reset demo data, and automatic persistence using browser `localStorage`.
- Real Lucide icons, keyboard-friendly labeled controls, responsive layout, and high-contrast text colors.

## Run locally

Prerequisite: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

```bash
npm run build
npm run preview
```

## Folder structure

```text
src/
├── app/
│   ├── App.tsx                 # Route table
│   └── providers/
│       └── AppProvider.tsx     # Shared app state + localStorage persistence
├── components/
│   ├── layout/
│   │   └── AppShell.tsx        # Sidebar, topbar, responsive navigation
│   └── ui/
│       └── PageHeader.tsx      # Shared page heading component
├── data/
│   └── seed.ts                 # Demo-only initial data
├── pages/
│   ├── DashboardPage.tsx
│   ├── ResidentsPage.tsx
│   ├── CensusPage.tsx
│   └── GenericPage.tsx         # Starter placeholders for planned modules
├── styles/
│   └── global.css
├── types/
│   └── index.ts                # Shared domain types
└── main.tsx
```

## React hooks used

### `useState`
Used for UI state that changes during a session: resident modal visibility, resident form fields, search query, mobile sidebar state, and the loaded app data.

### `useEffect`
In `AppProvider`, an effect writes the current `data` state to `localStorage` whenever it changes. The initial read happens in the `useState` lazy initializer so saved state is loaded before the first render. This avoids a read/write effect race that could overwrite stored data with seed data.

### `useMemo`
Used to memoize the provider value and filtered resident list. This can reduce unnecessary recalculation/re-rendering as the app grows. Do not add `useMemo` everywhere; profile first and use it where there is meaningful work or stable identity matters.

### `useContext`
`useAppData` reads shared app state from `AppProvider`, avoiding prop-drilling through every page.

### `useLocation` / `NavLink`
React Router hooks/components identify the current route and provide active navigation styling.

### `useState` vs `useEffect`
- State is the source of truth for the UI.
- Render should remain pure: calculate visible rows and totals from state.
- Effects synchronize with external systems, such as localStorage, subscriptions, or browser APIs.
- Do not use effects to derive values that can be calculated during render.

## Important MVP limitations

- **localStorage is not a backend or database.** Data is only in the current browser profile/device, can be edited by the user, has limited capacity, and is not shared between staff.
- No real authentication, authorization, secure session, server-side audit log, backup, or encrypted storage.
- No real document PDF generation, QR verification, payment gateway, SMS/email notifications, file uploads, or online resident portal yet.
- Most module pages are data-view placeholders; create/edit/status workflows are implemented only for resident add/delete.
- Census figures are only calculated from the sample/entered resident registry. They are not official government census statistics.
- Never enter actual personal, financial, complaint, or blotter information into this demo.

## Suggested production evolution

1. Move domain types and validation into a shared domain package or feature modules.
2. Add backend REST API (Node.js/Express or NestJS) and PostgreSQL/MySQL with migrations.
3. Add secure server-side authentication, MFA for privileged users, and server-enforced role/permission checks.
4. Implement the Data Privacy Act of 2012 compliance work: lawful purpose, privacy notices, data minimization, retention/deletion policy, access controls, incident response, and a privacy impact assessment with qualified guidance.
5. Add server-side audit trails, backups, monitoring, automated tests, and staging environment.
6. Build each placeholder as a feature folder with its own components, hooks, schemas, API client, and tests.

## Accessibility and visual design

The interface uses dark navy text on white/light surfaces, visible border separation, focusable native inputs/buttons, descriptive accessible labels on icon-only buttons, and a mobile navigation toggle. Validate color contrast and keyboard flows again when adding new colors or components.

## Demo credentials

There is no login in this MVP. The profile shown in the header is illustrative only and does not authenticate anyone.
