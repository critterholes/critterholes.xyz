import React, { useState, useEffect } from 'react';
import gameBg from '/src/assets/game-bg.jpg';

interface LeaderboardEntry {
  display_name: string; 
  wallet_address: string;
  highest_score: number;
}

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatAddress = (address: string) => {
    if (address.length < 10) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const backendUrl = '';
        const response = await fetch(`${backendUrl}/leaderboard`);
        const data = await response.json();

        if (data.success) {
          setLeaderboard(data.leaderboard);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: `url(${gameBg})`, backgroundSize: 'cover' }}
    >
      <div className="w-full max-w-2xl bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-4 border-yellow-800/50">
        <h1 className="text-6xl text-center font-bold text-yellow-300 mb-6" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
          Top 25 Scores
        </h1>
        {loading && <p className="text-center text-2xl">Loading...</p>}
        {error && <p className="text-center text-2xl text-red-400">{error}</p>}
        {!loading && !error && (
          <ol className="list-decimal list-inside space-y-3 text-2xl text-white h-[400px] overflow-y-auto pr-2">
            {leaderboard.map((entry, index) => (
              <li key={index} className="flex justify-between items-center bg-black/20 p-2 rounded-lg">
                <span className="font-bold">{index + 1}. {formatAddress(entry.display_name)}</span>
                <span className="text-yellow-400 font-bold">{entry.highest_score}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;