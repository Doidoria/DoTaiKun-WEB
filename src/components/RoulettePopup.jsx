import React from 'react';
import { motion } from 'framer-motion';
import rouletteBgImg from '../assets/RoulettePopup.png';

export default function RoulettePopup({ closeModal }) {

  const goToEventPage = () => {
    window.location.href = '/roulett-Event';
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative w-full max-w-2xl aspect-[1464/1335] bg-contain bg-no-repeat bg-center drop-shadow-2xl"
        style={{ backgroundImage: `url(${rouletteBgImg})` }} 
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        
        {/* X 버튼 영역 */}
        <button
          onClick={closeModal}
          className="absolute top-[3%] right-[7.5%] w-[8%] h-[8%] cursor-pointer z-50"
          aria-label="닫기"
        />

        {/* 타이틀 문구 */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-full text-center z-10">
          <h2 className="text-3xl md:text-3xl font-black text-[#F2EACE] tracking-tighter whitespace-nowrap" 
              style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 4px 10px rgba(0,0,0,0.8)' }}>
            매일 무료 룰렛 스핀!
          </h2>
        </div>

        {/* SPIN 버튼 (클릭 시 페이지 이동) */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[25%] z-20">
          <button 
            onClick={goToEventPage}
            className="w-full py-3 md:py-2 bg-[#8E9EAB] border-[4px] border-[#1C1C1C] rounded-none text-white 
            text-2xl md:text-2xl uppercase whitespace-nowrap transition-all hover:brightness-110 
            shadow-[inset_4px_4px_0_rgba(255,255,255,0.4),inset_-4px_-4px_0_rgba(0,0,0,0.3),0_6px_0_#1C1C1C,0_10px_15px_rgba(0,0,0,0.5)] 
            active:translate-y-1.5 active:shadow-[inset_4px_4px_0_rgba(255,255,255,0.4),inset_-4px_-4px_0_rgba(0,0,0,0.3),0_0px_0_#1C1C1C,0_5px_10px_rgba(0,0,0,0.5)]"
            style={{ fontWeight: 900, textShadow: '2px 2px 0 #222222' }}>
            스핀!
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
}