import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase.js';
import { collection, getDocs, doc, setDoc, updateDoc, increment } from 'firebase/firestore';

const initialCandidates = [
  { id: 1, title: "참가자 1 건축물", author: "유저1", img: "", votes: 0 },
  { id: 2, title: "참가자 2 건축물", author: "유저2", img: "", votes: 0 },
  { id: 3, title: "참가자 3 건축물", author: "유저3", img: "", votes: 0 },
  { id: 4, title: "참가자 4 건축물", author: "유저4", img: "", votes: 0 },
  { id: 5, title: "참가자 5 건축물", author: "유저5", img: "", votes: 0 },
  { id: 6, title: "참가자 6 건축물", author: "유저6", img: "", votes: 0 },
];

export default function ContestVote() {
  const [hasVoted, setHasVoted] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [isEnded, setIsEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const voted = localStorage.getItem('contest_voted');
    if (voted) setHasVoted(true);

    const endDate = new Date('2026-04-01T00:00:00+09:00');
    const now = new Date();
    if (now >= endDate) {
      setIsEnded(true);
    }
    const fetchCandidates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contest_votes"));
        
        if (querySnapshot.empty) {
          console.log("DB 초기화 중...");
          for (const c of initialCandidates) {
            await setDoc(doc(db, "contest_votes", c.id.toString()), c);
          }
          setCandidates(initialCandidates);
        } else {
          const data = querySnapshot.docs.map(doc => doc.data());
          data.sort((a, b) => a.id - b.id);
          setCandidates(data);
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async (id) => {
    if (hasVoted) return alert("이미 투표에 참여하셨습니다!");
    
    if (window.confirm("이 작품에 투표하시겠습니까? (투표 후 변경 불가)")) {
      setCandidates(prev => prev.map(c => c.id === id ? { ...c, votes: c.votes + 1 } : c));
      setHasVoted(true);
      localStorage.setItem('contest_voted', 'true');

      try {
        const candidateRef = doc(db, "contest_votes", id.toString());
        await updateDoc(candidateRef, {
          votes: increment(1)
        });
        alert("투표가 완료되었습니다!");
      } catch (error) {
        console.error("투표 전송 실패:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const winner = candidates.length > 0 ? [...candidates].sort((a, b) => b.votes - a.votes)[0] : null;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white text-2xl font-bold bg-[#1E1E1E]">데이터 불러오는 중...</div>;
  }

  return (
    <main 
      className="w-full min-h-screen pt-[200px] pb-[100px] relative z-10 flex flex-col items-center" 
      style={{ background: 'linear-gradient(180deg, #7ABADB 23.56%, #9BD1D5 43.75%, #0F2432 100%)' }}
    >
      <div className="w-full max-w-[1200px] px-4">
        
        {/* 뒤로 가기 및 테스트용 버튼 */}
        {/* <div className="mb-10 flex justify-between items-center z-10">
          <button onClick={() => {localStorage.removeItem("contest_voted"); window.location.reload();}}
              className="bg-red-600 text-white px-3 py-2 text-sm font-bold rounded border-2 border-[#1C1C1C] shadow-[2px_2px_0_#000] hover:bg-red-700 transition-colors active:translate-y-1 active:shadow-none">
              [테스트] 투표 락 해제
          </button>
        </div> */}

        {/* 상단 타이틀 영역 */}
        <div className="text-center mb-12">
          <h1 className="text-white text-[45px] md:text-[60px] font-bold drop-shadow-[-1px_5px_7px_rgba(0,0,0,0.25)] mb-4">
            {isEnded ? "🏆 건축 콘테스트 결과 발표 🏆" : "제1회 건축 콘테스트 투표"}
          </h1>
          <p className="text-white/90 text-[20px] font-medium drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]">
            {isEnded ? "콘테스트에 참여해주신 모든 분들께 감사드립니다!" : "기간: 2026.03.20 ~ 2026.03.31"}
          </p>
        </div>

        {isEnded && winner ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center max-w-3xl mx-auto bg-gradient-to-b from-[#194D56] to-[#102A3E] p-10 rounded-[20px] shadow-[0_15px_30px_rgba(0,0,0,0.5)] border-4 border-[#E6BE39]"
          >
            <h2 className="text-[#F2EACE] text-[40px] font-black tracking-wider mb-6 drop-shadow-[2px_2px_0_#000]">
              🥇 대망의 1위 우승작
            </h2>
            <div className="w-full h-[350px] bg-black/50 rounded-[15px] overflow-hidden mb-6 border-4 border-[#E6BE39] relative shadow-inner">
               {winner.img ? (
                 <img src={winner.img} alt={winner.title} className="w-full h-full object-cover" />
               ) : (
                 <div className="flex items-center justify-center w-full h-full text-white/50 text-xl font-bold">이미지 준비중</div>
               )}
               <div className="absolute top-4 right-4 bg-[#E6BE39] text-[#1C1C1C] font-black px-5 py-2 rounded-full shadow-[2px_4px_0_rgba(0,0,0,0.5)] text-xl border-2 border-black">
                 {winner.votes}표
               </div>
            </div>
            <h3 className="text-white text-[35px] font-bold drop-shadow-[2px_2px_0_#000] mb-2">{winner.title}</h3>
            <p className="text-[#8DFF95] text-[22px] font-bold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]">제작자: {winner.author}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {candidates.map((candidate) => (
              <div 
                key={candidate.id}
                className="bg-gradient-to-b from-[#194D56] to-[#102A3E] rounded-[20px] p-5 shadow-[1px_7px_15px_rgba(0,0,0,0.3)] flex flex-col items-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-full h-[220px] bg-[#132936] rounded-[15px] overflow-hidden mb-5 border border-white/10 flex items-center justify-center relative shadow-inner">
                  {candidate.img ? (
                    <img src={candidate.img} alt={candidate.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="text-white/40 font-bold text-lg">이미지 등록 대기중</span>
                  )}
                  <div className="absolute top-3 right-3 bg-black/70 border border-white/20 text-white font-bold text-sm px-3 py-1 rounded-md">
                    {candidate.votes}표
                  </div>
                </div>

                <h3 className="text-white text-[24px] font-bold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] w-full truncate text-center mb-1">
                  {candidate.title}
                </h3>
                <p className="text-[#ACACAC] text-[16px] font-medium mb-6">by {candidate.author}</p>

                <button
                  onClick={() => handleVote(candidate.id)}
                  disabled={hasVoted}
                  className={`w-[85%] py-3 border-[4px] border-[#1C1C1C] text-[22px] font-black uppercase tracking-wider transition-all
                    ${hasVoted 
                      ? 'bg-[#424242] text-[#888888] shadow-[inset_2px_2px_0_rgba(0,0,0,0.2)] cursor-not-allowed' 
                      : 'bg-[#73F482] text-[#1C1C1C] shadow-[inset_4px_4px_0_rgba(255,255,255,0.6),inset_-4px_-4px_0_rgba(0,0,0,0.2),0_6px_0_#1C1C1C] hover:brightness-110 active:translate-y-1.5 active:shadow-[inset_4px_4px_0_rgba(255,255,255,0.6),inset_-4px_-4px_0_rgba(0,0,0,0.2),0_0px_0_#1C1C1C]'
                    }
                  `}
                  style={{ textShadow: hasVoted ? 'none' : '1px 1px 0 rgba(255,255,255,0.5)' }}
                >
                  {hasVoted ? '투표 완료' : '투표하기'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}