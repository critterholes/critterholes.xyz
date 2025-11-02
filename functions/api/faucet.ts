import { ethers } from "ethers";

export interface Env {
  DEGEN_RPC_URL: string;
  FAUCET_CONTRACT_ADDRESS: string;
  DEV_PRIVATE_KEY: string;
}

const FAUCET_ABI = ["function requestFaucet(address _recipient) external"];

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { env } = context;
    const { userAddress } = await context.request.json<{
      userAddress: string;
    }>();

    if (!userAddress || !ethers.isAddress(userAddress)) {
      return new Response(JSON.stringify({ error: "address not valid." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const provider = new ethers.JsonRpcProvider(env.DEGEN_RPC_URL);

    const devWallet = new ethers.Wallet(env.DEV_PRIVATE_KEY, provider);

    const balance = await provider.getBalance(userAddress);

    if (balance > 0) {
      return new Response(
        JSON.stringify({ message: "your not eligible (balance > 0)." }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const faucetContract = new ethers.Contract(
      env.FAUCET_CONTRACT_ADDRESS,
      FAUCET_ABI,
      devWallet
    );

    console.log(`Memproses faucet untuk: ${userAddress}`);
    const tx = await faucetContract.requestFaucet(userAddress);

    console.log(`Faucet berhasil dikirim! Tx hash: ${tx.hash}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Faucet successfully sent to ${userAddress}`,
        transactionHash: tx.hash,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Faucet Error:", error);

    if (error.message?.includes("Address has already claimed faucet")) {
      return new Response(
        JSON.stringify({
          error: "address has already been claimed by faucet.",
        }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "An internal error occurred on the server." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
