
<div align="center">

# 🕳️ Critterholes

### A Web3 Play-to-Earn Game built with React + TypeScript + Vite

Whack the critters, earn tokens, and climb your way up the leaderboard!  
Fast, fun, and fully on-chain — **Critterholes** brings classic gameplay into the world of Web3. 🪙🐹

## Link Game 

https://farcaster.xyz/miniapps/NMlQYJwGtue4/critter-holes

---

[![Made with Vite](https://img.shields.io/badge/Made%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

</div>

---

## 🎮 Gameplay Overview

In **Critterholes**, your goal is simple — **whack as many critters as you can before the timer runs out!**

Each critter type gives a different score. The faster your reaction, the more you earn!

### 🐾 Critter Points

| Critter | Image | Points |
|----------|--------|---------|
| 🐹 **Mole** | <img src="src/assets/mole.webp" alt="Mole" width="48"/> | **1 Point** |
| 🦨 **Skunk** | <img src="src/assets/skunk.webp" alt="Skunk" width="48"/> | **2 Points** |
| 🐰 **Rabbit** | <img src="src/assets/rabbit.webp" alt="Rabbit" width="48"/> | **3 Points** |

⏱️ *Be quick — the clock is ticking!*

---

## 🪙 Game Economy

Your score determines the amount of tokens you earn.

- 🟡 **$CHP** — The main in-game token, earned from your score.  
- 🔵 **$WCT** / 🟣 **$DEGEN** — Random surprise rewards!  
- ⚠️ **$CHP** is currently non-transferable between players, but a swap feature is **coming soon**.

Play, earn, and collect tokens in every round!

---

## ✨ Key Features

- ⚡ **Fast Web Gameplay** — Powered by React + Vite for smooth and instant performance.  
- 🎮 **Addictive Tap Mechanics** — Whack, score, and compete.  
- 🪙 **Play-to-Earn Integration** — Rewards based on your gameplay.  
- 💫 **Framer Motion Animations** — Clean and dynamic UI transitions.  
- 🌐 **Web3 Ready** — Supports wallet login (MetaMask, Farcaster, etc).  
- 🎨 **Fully Customizable UI** — Simple to tweak or redesign with TailwindCSS.  

---

## 🚀 Quick Start (Local Setup)

Make sure you have **Node.js 18+** and **npm** or **yarn** installed.

```bash
# 1. Clone the repository
git clone https://github.com/hihenluo/assets.git
cd assets

# 2. Install dependencies
npm install
# or
yarn install

# 3. Run the development server
npm run dev

,,,

---


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

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

export default tseslint.config([
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

# 🤝 Contributing

We welcome all contributions! 🎉

1. Fork this repository

2. Create your branch (feature/your-feature)

3. Commit your changes

4. Open a Pull Request

You can:

- Improve the UI/UX

- Add sound effects or animations

- Introduce new critters or difficulty modes

- Integrate wallet connection or leaderboard
