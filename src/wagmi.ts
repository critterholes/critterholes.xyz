// src/wagmi.ts

import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains' 
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'
import { metaMask, walletConnect } from '@wagmi/connectors'

const projectId = 'cd169b99d42633d1d81f5aee613d0eed'; 
    
export const config = createConfig({
  chains: [base], 
  transports: {
    [base.id]: http(),
  },
  connectors: [
    metaMask(),
    walletConnect({ projectId }),
    miniAppConnector(),
  ]
})