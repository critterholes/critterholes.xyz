import { useConnect } from 'wagmi';

export function ConnectWalletPage() {
  const { connectors, connect } = useConnect();

  const topConnectors = connectors.filter(c => c.name === 'MetaMask' || c.name === 'WalletConnect');
  const bottomConnector = connectors.find(c => c.name === 'Farcaster');

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-500 to-green-600 text-white font-fredoka">
      <div className="text-center bg-black/30 backdrop-blur-md p-10 rounded-2xl shadow-lg">
        <h1 className="text-5xl font-bold mb-4">Welcome to Critter Hole!</h1>
        <p className="text-2xl mb-8">Please connect your wallet to continue.</p>
        
        <div className="flex flex-col items-center gap-4">
          
          <div className="flex justify-center gap-4">
            {topConnectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 
                           text-white font-bold py-3 px-6 rounded-full text-lg border-b-4 
                           border-blue-700 hover:border-blue-800 transition-all 
                           duration-150 transform hover:scale-105"
              >
                {connector.name}
              </button>
            ))}
          </div>

          {bottomConnector && (
            <button
              key={bottomConnector.uid}
              onClick={() => connect({ connector: bottomConnector })}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 
                         text-white font-bold py-3 px-8 rounded-full text-lg border-b-4 
                         border-indigo-700 hover:border-indigo-800 transition-all 
                         duration-150 transform hover:scale-105"
            >
              {bottomConnector.name}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}