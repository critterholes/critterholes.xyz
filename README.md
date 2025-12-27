# 🎮 CRITTERHOLES OFFICIAL 🎮

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38BDF8?logo=tailwindcss)
![Base](https://img.shields.io/badge/Base-Mainnet-35D07F?logo=Base)
![Reown](https://img.shields.io/badge/Reown-AppKit-8A2BE2?logo=walletconnect)
![Wagmi](https://img.shields.io/badge/Wagmi-2.16-FF9900?logo=ethereum)
![Farcaster](https://img.shields.io/badge/Farcaster-MiniApp-6F00FF?logo=farcaster)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Functions-F38020?logo=cloudflare)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

---

## 🎮 Overview 

**CritterHoles on Base** is a blockchain-based casual game built on **Base Mainnet**, where players whack critters, earn points, and claim on-chain rewards.  
The game uses **React + TypeScript + Vite** with **Reown AppKit**, **wagmi**, and a Cloudflare backend for claim verification.

---

## [DEMO ON FARCASTER](https://farcaster.xyz/miniapps/eK5FT3tFgDQg/critter-holes-on-Base)

## 🧩 Gameplay

### 🎯 Objective
- Hit critters as they pop up before time runs out.
- Each critter type gives different scores based on rarity:

| Critter | Image | Points | Rarity |
|----------|--------|---------|---------|
| 🐹 Mole | ![mole](./src/assets/mole.webp) | 1 | Common |
| 🦨 Skunk | ![skunk](./src/assets/skunk.webp) | 2 | Uncommon |
| 🐇 Rabbit | ![rabbit](./src/assets/rabbit.webp) | 3 | Rare |

### 🪓 Requirement
You must own a **Hammer NFT** to play. Mint one on the **Mint Page** using the `mint()` function in the Base contract.

### 💰 Rewards
- After the game ends, scores are converted into `$CHP` tokens.
- Random rewards include `$WCT` or `$DEGEN`.
- Players have a **daily claim limit**, read from the contract.
- Claims are verified through a Cloudflare Function at `/api/claim`.

---

## 🪙 Game Economy

- `$CHP` — main in-game point token.  
- `$WCT` and `$DEGEN` — bonus tokens randomly distributed.  
- Smart contracts are managed in the [Hardhat repository](https://github.com/hihenluo/hardhat).

---

## ⚙️ Architecture

| Layer | Description |
|-------|--------------|
| **Frontend** | React 19 + TypeScript + Vite 7 |
| **Blockchain** | Base Mainnet |
| **Wallet Integration** | Reown AppKit + wagmi + viem |
| **Backend** | Cloudflare Functions (`/functions/claim.ts`) |
| **UI Framework** | TailwindCSS + Framer Motion |
| **MiniApp** | Farcaster integration |

---

## 🧑‍💻 Setup & Development

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/hihenluo/Critterholes.git
cd Critterholes
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

In the `functions/` directory, create an `.env` file:

```bash
SIGNER_PRIVATE_KEY=your_private_key
ETHIX_TOKEN_ADDRESS=your_ethix_token_address
G_TOKEN_ADDRESS=your_gooddollar_token_address
Base_RPC_URL=https://forno.Base.org
```

> These variables are used by the Cloudflare Function `/api/claim` to sign reward claims and interact with Base smart contracts.

---

## 🚀 Run the Game

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## ☁️ Cloudflare Function

### `/functions/claim.ts`

Handles reward claiming logic:
- Validates connected wallet and score.
- Generates and returns claim signature (`v`, `r`, `s`, `databytes`).
- Interacts with Base contracts to confirm reward eligibility.

Deploy to Cloudflare with:

```bash
npx wrangler deploy
```

---

## 🧠 Game Flow Summary

1. Player connects wallet using Reown.  
2. System checks Hammer NFT ownership.  
3. If missing, mint one before playing.  
4. During the game, player earns points.  
5. After game ends, claim reward via `/api/claim`.  
6. Backend signs transaction and executes `claim()` on-chain.  

---

## 🔗 Useful Links

- 🎮 [Main Game Repo](https://github.com/hihenluo/Critterholes-on-Base)
- 💻 [Smart Contract Repo (Hardhat)](https://github.com/hihenluo/hardhat)
- 💚 [Base Network](https://Base.org/)
- 🔐 [Reown AppKit](https://reown.io/)
- 🌐 [Cloudflare Pages](https://developers.cloudflare.com/pages/)

---

## 📜 License

Licensed under the [MIT License](https://github.com/hihenluo/Critterholes-on-Base/blob/main/LICENSE.md)

---

### 💫 Built with ❤️ by the CritterHoles Team  
_on Base Mainnet • Powered by Reown & Farcaster_
