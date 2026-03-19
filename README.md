# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Firebase setup

This project is configured for Firebase using Vite environment variables.

1. Copy `.env.example` to `.env`.
2. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
3. In your Firebase project settings, create a Web App and copy its config values.
4. Paste those values into `.env` using the `VITE_FIREBASE_*` keys.
5. Start the app with `npm run dev`.

Firebase exports are available from `src/firebase.js`:

- `app`
- `auth`
- `db`
- `storage`

Example usage:

```jsx
import { auth, db } from './firebase'
```
