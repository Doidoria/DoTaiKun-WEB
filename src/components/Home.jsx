import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './Hero';
import Content from './Content';
import Roulette from './RoulettePopup'; 

import rouletteBtnImg from '../assets/Roulette.png'; 

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Hero />
      <Content />
      
      {/* 플로팅 이벤트 버튼 (우측 하단 고정) */}
      <div className="fixed bottom-10 right-12 z-40">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="block bg-transparent border-none cursor-pointer focus:outline-none p-0 outline-none"
        > 
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative group flex flex-col items-center"
          >
            <div className="absolute -top-14 bg-gray-900 border-2 border-yellow-400 text-yellow-400 text-sm font-bold py-2 px-3 rounded-xl opacity-0 
            group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(250,204,21,0.5)] pointer-events-none whitespace-nowrap z-10">
              매일매일 룰렛 스핀! 🎡
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-b-2 border-r-2 border-yellow-400 rotate-45"></div>
            </div>

            <motion.img 
              src={rouletteBtnImg}
              alt="룰렛 이벤트 참여"
              className="w-20 h-20 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] rounded-full"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Roulette closeModal={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}