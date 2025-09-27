// src/config/game.ts

export const gameContractAddress = '0xcDbd6c04A7b9d2d9aB02631e7fe2bDa76993a398';

export const gameContractAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "initialOwner", "type": "address" },
      { "internalType": "address", "name": "_Super", "type": "address" },
      { "internalType": "address", "name": "_Vault", "type": "address" },
      { "internalType": "address", "name": "_CHPAddress", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" },
  { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "nonce", "type": "uint256" } ], "name": "Claimed", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newClaimsAvailable", "type": "uint256" } ], "name": "Played", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "setting", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "newValue", "type": "uint256" } ], "name": "SettingsUpdated", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "newVault", "type": "address" }], "name": "VaultUpdated", "type": "event" },
  { "inputs": [], "name": "CHP", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "COOLDOWN_PERIOD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "Super", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_newDailyLimit", "type": "uint256" }, { "internalType": "uint256", "name": "_newMaxClaim", "type": "uint256" } ], "name": "UDaily", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "Vault", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "bytes", "name": "databytes", "type": "bytes" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "dailyPlayLimit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "maxClaimPerTx", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "play", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "players", "outputs": [ { "internalType": "uint256", "name": "claimsAvailable", "type": "uint256" }, { "internalType": "uint256", "name": "dailyPlaysUsed", "type": "uint256" }, { "internalType": "uint256", "name": "periodStartTimestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "_newVault", "type": "address" }], "name": "setVault", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "usedNonces", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }
] as const;