// src/App.tsx
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { sdk } from "@farcaster/miniapp-sdk";

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import InfoPage from "./pages/InfoPage";
import { UserPage } from "./pages/UserPage";
import MintPage from "./pages/MintPage";
import SwapPage from "./pages/SwapPage"; 
import UpgradePage from "./pages/UpgradePage"; 
import "./index.css";

function App() {
  useEffect(() => {
    sdk.actions
      .ready()
      .then(() => sdk.actions.addMiniApp())
      .catch((e) => console.warn("SDK ready error:", e));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="info" element={<InfoPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="mint" element={<MintPage />} />
        <Route path="swap" element={<SwapPage />} />
        <Route path="upgrade" element={<UpgradePage />} /> 
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;