// wagmi.ts

import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base } from "@reown/appkit/networks";

const projectId = "cd169b99d42633d1d81f5aee613d0eed";

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [base],
  ssr: true,
  connectors: [],
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],
  projectId,
  metadata: {
    name: "Critter Hole",
    description: "Critter Hole Game on Base",
    url: "https://assets-dhl.pages.dev/",
    icons: ["https://assets-dhl.pages.dev//logo.png"],
  },
  features: {
    history: false,
    send: true,
  },
  themeMode: "dark",
});

export const config = wagmiAdapter.wagmiConfig;
