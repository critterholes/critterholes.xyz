// src/config/game.ts

export const gameContractAddress = '0x8e5cc6B61E7aC9631934dD422301914ac5761524';

export const gameContractAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "initialOwner", "type": "address" },
      { "internalType": "address", "name": "_CHP", "type": "address" },
      { "internalType": "address", "name": "_token2", "type": "address" },
      { "internalType": "address", "name": "_token3", "type": "address" },
      { "internalType": "address", "name": "_Super", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" },
  { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Claimed", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newLimit", "type": "uint256" }], "name": "DailyLimitUpdated", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint8", "name": "tokenSlot", "type": "uint8" }, { "indexed": true, "internalType": "address", "name": "tokenAddress", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newMaxClaim", "type": "uint256" } ], "name": "RewardTokenUpdated", "type": "event" },
  { "inputs": [], "name": "CHP", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "COOLDOWN_PERIOD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "Super", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_newDailyLimit", "type": "uint256" }], "name": "UDaily", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "uint8", "name": "_tokenSlot", "type": "uint8" }, { "internalType": "address", "name": "_newTokenAddress", "type": "address" }, { "internalType": "uint256", "name": "_newMaxClaim", "type": "uint256" } ], "name": "UToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "bytes", "name": "databytes", "type": "bytes" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "dailyClaimLimit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "maxClaimCHP", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "players", "outputs": [ { "internalType": "uint256", "name": "dailyClaimsUsed", "type": "uint256" }, { "internalType": "uint256", "name": "periodStartTimestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "rewardToken2", "outputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "maxClaim", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "rewardToken3", "outputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "maxClaim", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "usedNonces", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "_tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdrawERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
] as const;