// src/config/swap.ts
export const bonkSwapAddress = '0x0333348D5413a6530eF67215E5ac2aE7d8180C07'; 

export const bonkSwapAbi = [
  { "inputs": [ { "internalType": "address", "name": "_initialOwner", "type": "address" }, { "internalType": "address", "name": "_bonkTokenAddress", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "newRate", "type": "uint256" } ], "name": "RateUpdated", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "bonkBurned", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "ethReceived", "type": "uint256" } ], "name": "Swapped", "type": "event" },
  { "inputs": [], "name": "bonkToken", "outputs": [ { "internalType": "contract IBONK", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "minSwap", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "rate", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "_tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "rescueERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_newMinAmount", "type": "uint256" } ], "name": "setMinSwap", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_newrate", "type": "uint256" } ], "name": "setRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_bonkAmount", "type": "uint256" } ], "name": "swap", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "stateMutability": "payable", "type": "receive" }
] as const;