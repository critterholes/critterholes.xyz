import { ethers } from "ethers";

interface RequestBody {
  userAddress: string;
  score: number;
}

interface Env {
  SIGNER_PRIVATE_KEY: string;
  WCT_TOKEN_ADDRESS: string;
  DEGEN_TOKEN_ADDRESS: string;
  BASE_RPC_URL: string; 
}

const NFT_CONTRACT = "0x49FDb7C8C9c19E4ac93331139B6C15b713f438B1";

const ERC1155_ABI = [
  "function balanceOf(address account, uint256 id) view returns (uint256)"
];

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body: RequestBody = await context.request.json();
    const { userAddress, score } = body;

    if (!userAddress || typeof score !== "number") {
      return Response.json(
        { error: "Missing or invalid userAddress or score" },
        { status: 400 }
      );
    }

    const {
      SIGNER_PRIVATE_KEY,
      WCT_TOKEN_ADDRESS,
      DEGEN_TOKEN_ADDRESS,
      BASE_RPC_URL,
    } = context.env;

    if (!SIGNER_PRIVATE_KEY || !WCT_TOKEN_ADDRESS || !DEGEN_TOKEN_ADDRESS || !BASE_RPC_URL) {
      return Response.json(
        { error: "Backend environment not configured correctly" },
        { status: 500 }
      );
    }

    if (score <= 0) {
      return Response.json(
        { error: "Score must be greater than 0 to claim" },
        { status: 400 }
      );
    }

    
    const provider = new ethers.JsonRpcProvider(BASE_RPC_URL);
    const nft = new ethers.Contract(NFT_CONTRACT, ERC1155_ABI, provider);
    const balance = await nft.balanceOf(userAddress, 1); 

    if (balance <= 0n) {
      return Response.json(
        { error: "You need mint NFT to play & claim" },
        { status: 403 }
      );
    }

    
    const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY);

    const isWCT = Math.random() < 0.5;
    const rewardTokenAddress = isWCT ? WCT_TOKEN_ADDRESS : DEGEN_TOKEN_ADDRESS;
    const rewardTokenSymbol = isWCT ? "WCT" : "DEGEN";
    let randomAmount;

    if (isWCT) {
      randomAmount = 0.05 + Math.random() * (0.1 - 0.05);
    } else {
      randomAmount = 3 + Math.random() * 2;
    }

    const rewardTokenAmount = ethers.parseEther(randomAmount.toFixed(18));
    const deadline = Math.floor(Date.now() / 1000) + 60;
    const nonce = Date.now();
    const amountCHP = score;
    const recipient = userAddress;

    const abiCoder = new ethers.AbiCoder();
    const databytes = abiCoder.encode(
      ["address", "uint256", "address", "uint256", "uint256", "uint256"],
      [recipient, amountCHP, rewardTokenAddress, rewardTokenAmount, deadline, nonce]
    );

    const messageHash = ethers.keccak256(databytes);
    const signature = signer.signingKey.sign(messageHash);

    const responsePayload = {
      databytes,
      v: signature.v,
      r: signature.r,
      s: signature.s,
      rewardTokenSymbol,
      rewardTokenAmount: randomAmount.toFixed(4),
      amountCHP,
      rewardTokenAddress,
    };

    return Response.json(responsePayload);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
