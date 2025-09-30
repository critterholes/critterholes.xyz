// src/pages/ConnectWalletPage.tsx

export function ConnectWalletPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-500 to-green-600 text-white font-fredoka">
      <div className="text-center bg-black/30 backdrop-blur-md p-10 rounded-2xl shadow-lg flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Critter Hole!</h1>
        <p className="text-2xl mb-8">Please connect your wallet to continue.</p>
        <appkit-button />
      </div>
    </div>
  );
}