// src/config/staking.ts

export const stakingAddress = '0x018185C3036C15a87a4953565ae7B7926eD56271'; 

export const stakingAbi = [
  { "inputs": [ { "internalType": "address", "name": "_initialOwner", "type": "address" }, { "internalType": "address", "name": "_lumpNftAddress", "type": "address" }, { "internalType": "address", "name": "_bonkTokenAddress", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" },
  { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "OwnableInvalidOwner", "type": "error" },
  { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "OwnableUnauthorizedAccount", "type": "error" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "RewardClaimed", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Staked", "type": "event" },
  { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Unstaked", "type": "event" },
  { "inputs": [], "name": "TOKEN_ID", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "bonkToken", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "claimRewards", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "lumpNFT", "outputs": [ { "internalType": "contract IERC1155", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "minClaimAmount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "onERC1155Received", "outputs": [ { "internalType": "bytes4", "name": "", "type": "bytes4" } ], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" } ], "name": "pendingRewards", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "_tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "rescueERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "rescueETH", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "rewardRatePerDay", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_newAmount", "type": "uint256" } ], "name": "setMinClaimAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_newRate", "type": "uint256" } ], "name": "setRewardRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "stakes", "outputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }, { "internalType": "uint256", "name": "lastStakeTime", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "totalStaked", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
  { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdrawRewardTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
] as const;