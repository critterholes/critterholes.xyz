import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { base } from 'wagmi/chains'; 
import { sdk } from "@farcaster/miniapp-sdk";

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import InfoPage from './pages/InfoPage';
import { UserPage } from './pages/UserPage'; 
import { ConnectWalletPage } from './pages/ConnectWalletPage';
import { WrongNetworkPage } from './pages/WrongNetworkPage';
import MintPage from './pages/MintPage';
import MintPromptPage from './pages/MintPromptPage';
import { useHasHammerNft } from './hooks/useHasHammerNft';
import './index.css';

function App() {
  const [isCheckingContext, setIsCheckingContext] = useState(true);
  const [isVerifiedMiniApp, setIsVerifiedMiniApp] = useState(false);

  useEffect(() => {
    const verifyContext = async () => {
      try {
        const isMiniApp = await sdk.isInMiniApp();
        setIsVerifiedMiniApp(isMiniApp);
      } catch (e) {
        console.warn("Farcaster context verification error:", e);
        setIsVerifiedMiniApp(false);
      } finally {
        setIsCheckingContext(false);
      }
    };
    verifyContext();
  }, []);

  useEffect(() => {
    sdk.actions.ready()
      .then(() => sdk.actions.addMiniApp())
      .catch((e) => console.warn("SDK ready error:", e));
  }, []);

  const { isConnected, chain } = useAccount();
  const { hasNft, isLoading: isLoadingNft } = useHasHammerNft();

  if (isCheckingContext) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl animate-pulse">Verifying Farcaster Environment...</p>
      </div>
    );
  }

  if (!isVerifiedMiniApp) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white text-center p-4">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl mb-6">This app can only be used inside a Farcaster client (e.g., Farcaster App, Base App).</p>
        <a
          href="https://farcaster.xyz/miniapps/NMlQYJwGtue4/critter-holes"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
        >
          Open in Farcaster
        </a>
      </div>
    );
  }

  if (!isConnected) {
    return <ConnectWalletPage />;
  }
  
  if (chain?.id !== base.id) {
    return <WrongNetworkPage />;
  }

  if (isLoadingNft) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl">Loading your hammers...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {hasNft ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="game" element={<GamePage />} />
            <Route path="info" element={<InfoPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="mint" element={<Navigate to="/game" />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<MintPromptPage />} />
            <Route path="mint" element={<MintPage />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;