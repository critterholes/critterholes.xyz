import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base } from "@reown/appkit/networks";
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector';

const projectId = "cd169b99d42633d1d81f5aee613d0eed";

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [base],
  ssr: true,
  connectors: [
    miniAppConnector(),
  ],
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],
  projectId,
  metadata: {
    name: "Critter Hole",
    description: "Critter Hole Game on Base",
    url: "https://critterholes.xyz",
    icons: ["https://critterholes.xyz/logo.png"],
  },
  features: {
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
    history: false,
    send: true,
  },
  themeMode: "light",
});

export const config = wagmiAdapter.wagmiConfig;