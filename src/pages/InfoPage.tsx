// src/pages/InfoPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import gameBg from '/src/assets/game-bg.jpg';
import moleImg from '/src/assets/mole.webp';
import skunkImg from '/src/assets/skunk.webp';
import rabbitImg from '/src/assets/rabbit.webp';
import { motion } from 'framer-motion';

const InfoPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full min-h-screen p-4 pb-24 text-white relative"
      style={{ backgroundImage: `url(${gameBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <Link to="/" className="absolute top-4 left-4 z-50 bg-black/50 p-3 rounded-full text-white hover:bg-black/80 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      <div className="w-full max-w-4xl mx-auto pt-8">
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-4 border-yellow-800/50 space-y-8">
          
          <div>
            <h1 className="text-5xl text-center font-bold text-yellow-300 mb-4" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
              How to Play
            </h1>
            <div className="text-xl text-center space-y-2">
              <p>Whack the critters as they pop out of the holes!</p>
              <p>Each critter gives you a different score. Be quick, the clock is ticking!</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl text-center font-bold text-yellow-300 mb-6" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
              Critter Points
            </h2>
            <div className="flex justify-center items-end gap-x-8 md:gap-x-16">
              <div className="text-center flex flex-col items-center">
                <img src={moleImg} alt="Mole" className="h-24 md:h-32 mb-2 p-0"/>
                <p className="text-2xl font-bold">Mole: <span className="text-yellow-400">1 Point</span></p>
              </div>
              <div className="text-center flex flex-col items-center">
                <img src={skunkImg} alt="Skunk" className="h-24 md:h-32 mb-2 p-2"/>
                <p className="text-2xl font-bold">Skunk: <span className="text-yellow-400">2 Points</span></p>
              </div>
              <div className="text-center flex flex-col items-center">
                <img src={rabbitImg} alt="Rabbit" className="h-24 md:h-32 mb-2 p-2"/>
                <p className="text-2xl font-bold">Rabbit: <span className="text-yellow-400">3 Points</span></p>
              </div>
            </div>
          </div>

          <div>
             <h2 className="text-4xl text-center font-bold text-yellow-300 mb-6" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}>
               Game Economy
             </h2>
             <div className="text-lg text-center space-y-3 max-w-3xl mx-auto">
               <p>
                 <span className="font-bold text-yellow-400">$CHP</span> is the main in-game token, earned based on your score.
               </p>
               <p>
                 You also have a chance to get a random surprise reward: 
                 either <span className="font-bold text-green-400">$ETHIX</span> or <span className="font-bold text-sky-400">$GoodDollar</span>!
               </p>
               <p>
                 <span className="font-bold text-yellow-400">$CHP</span> is a non-transferable token between players, but can be swapped SOON.
               </p>
             </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default InfoPage;