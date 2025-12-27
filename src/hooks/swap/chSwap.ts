// src/abis/chSwap.ts

/**
 * ABI for your CHSwap contract.
 * !! IMPORTANT: Copy the full ABI from your Hardhat
 * artifacts/contracts/CHSwap.sol/CHSwap.json file.
 * This is a minimal version for the key functions.
 */
export const chSwapAbi = [
  // --- View Functions (Read) ---
  {
    "inputs": [],
    "name": "buyPricePer1000CHP_USDC",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sellPricePer1000CHP_USDC",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  
  // --- Write Functions (Transactions) ---
  {
    "inputs": [{ "internalType": "uint256", "name": "_amountUSDCIn", "type": "uint256" }],
    "name": "buyCHP",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_amountCHPToSell", "type": "uint256" }],
    "name": "sellCHP",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },

  // --- Events (for tracking) ---
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amountCHP", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "usdcCost", "type": "uint256" }
    ],
    "name": "CHPBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amountCHP", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "usdcReceived", "type": "uint256" }
    ],
    "name": "CHPSold",
    "type": "event"
  }
  // ... Add your other functions like Upprice, depositTokens, etc.
] as const;