import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const items = [
    "다이아 10개", "랜덤박스 1개", "랜덤박스 3개",
    "네더라이트 1개", "골드랜박 1개", "낡은골드랜박 5개",
    "골드 10000", "골드 30000", "골드 50000",
    "골드 100000", "수선 인첸트북", "가시3 인첸트북"
];

export default function RouletteEvent() {
    const [nickname, setNickname] = useState("");
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [resultMessage, setResultMessage] = useState("마인크래프트 닉네임을 입력하고 스핀하세요!");
    const [hasPlayedToday, setHasPlayedToday] = useState(false);

    useEffect(() => {
        const lastPlayDate = localStorage.getItem("roulette_last_play");
        const today = new Date().toLocaleDateString();

        if (lastPlayDate === today) {
            setHasPlayedToday(true);
            setResultMessage("오늘은 이미 참여하셨습니다. 내일 다시 와주세요!");
        }
    }, []);

    const sendDiscordWebhook = async (winnerName, prize) => {
        const webhookURL = "https://discord.com/api/webhooks/1485595750296719440/vhN18nIJB2V7yH9s2g1GNHHGSAWyt_zgjnOc73kqDEgtskbB5bGdglq07Jx3XGwuD01c";
        // if (webhookURL === "여기에_디스코드_웹훅_URL_입력") return; { URL 없을시 에러 방지용 }

        const message = {
            content: `**[도타이쿤 매일 무료 룰렛]** \`${winnerName}\`님이 **${prize}**에 당첨!🎉`,
        };

        try {
            await fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(message),
            });
        } catch (error) {
            console.error("웹훅 전송 실패:", error);
        }
    };

    const spinRoulette = () => {
        if (hasPlayedToday) {
            alert("하루에 한 번만 참여할 수 있습니다!");
            return;
        }
        if (!nickname.trim()) {
            alert("마인크래프트 닉네임을 정확히 입력해주세요!");
            return;
        }
        if (isSpinning) return;

        setIsSpinning(true);
        setResultMessage("두구두구두구... ");

        const prizeIndex = Math.floor(Math.random() * items.length);
        const prize = items[prizeIndex];

        const arc = 360 / items.length; // 30도
        const targetAngle = 360 - (prizeIndex * arc);
        const newRotation = rotation + 1800 + targetAngle - (rotation % 360);

        setRotation(newRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setResultMessage(`🎉 축하합니다! [ ${prize} ] 당첨! 🎁`);

            const today = new Date().toLocaleDateString();
            localStorage.setItem("roulette_last_play", today);
            setHasPlayedToday(true);

            sendDiscordWebhook(nickname, prize);
        }, 4000);
    };

    const wheelBackground = "repeating-conic-gradient(from -15deg, #757575 0 30deg, #616161 30deg 60deg)";

    return (
        <div className="min-h-screen bg-[#212121] flex flex-col items-center justify-start pt-[180px] md:pt-[220px] pb-20 font-sans relative overflow-x-hidden">

            {/* 2. 뒤로 가기 버튼을 absolute에서 빼고 일반 박스로 만들어 헤더 밑에 안전하게 배치 */}
            <div className="w-full max-w-md px-4 mb-8 flex justify-start z-10 gap-5">
                <a href="/"
                    className="px-4 py-2 bg-[#424242] text-white font-bold rounded-sm border-2 border-[#1C1C1C] transition-all
                      shadow-[inset_2px_2px_0_rgba(255,255,255,0.2),_2px_2px_0_#000] hover:bg-[#616161] hover:translate-y-[1px] hover:shadow-[inset_2px_2px_0_rgba(255,255,255,0.2),_1px_1px_0_#000]">
                    ← 메인으로 돌아가기
                </a>
                {/* 임시 테스트용 초기화 버튼 (안전한 위치로 이동) */}
                {/* <button onClick={() => {localStorage.removeItem("roulette_last_play"); window.location.reload();}}
                    className="bg-red-600 text-white px-3 py-2 text-sm font-bold rounded border-2 border-[#1C1C1C] shadow-[2px_2px_0_#000] hover:bg-red-700 transition-colors active:translate-y-1 active:shadow-none">
                    [테스트] 기록 삭제
                </button> */}
            </div>

            {/* 헤더 타이틀 */}
            <h1 className="text-4xl md:text-5xl font-black text-[#F2EACE] tracking-tighter mb-10 text-center z-10 px-4"
                style={{ textShadow: '4px 4px 0 #000, 0 4px 10px rgba(0,0,0,0.5)' }}>
                도타이쿤 럭키 룰렛
            </h1>

            {/* 룰렛 메인 판 */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 mb-12">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[35px] border-l-transparent border-r-transparent border-t-[#E53935] drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] z-30" />

                <div className="w-full h-full rounded-full border-[8px] border-[#2C2C2C] shadow-[0_15px_30px_rgba(0,0,0,0.8)] overflow-hidden relative z-20">

                    <motion.div
                        className="w-full h-full rounded-full relative"
                        style={{ background: wheelBackground }}
                        animate={{ rotate: rotation }}
                        transition={{ duration: 4, ease: "easeOut" }}
                    >
                        {items.map((item, index) => {
                            const angle = index * 30;
                            return (
                                <div
                                    key={index}
                                    className="absolute top-0 left-0 w-full h-full"
                                    style={{ transform: `rotate(${angle}deg)` }}
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 flex flex-col items-center justify-start pt-3 md:pt-4">
                                        <span className="text-[11px] md:text-[13px] font-black text-white text-center leading-tight drop-shadow-[2px_2px_0_#000] whitespace-nowrap">
                                            {item.split(" ").map((word, i) => <div key={i}>{word}</div>)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#BDBDBD] rounded-full border-4 border-[#1C1C1C] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] z-30 flex items-center justify-center">
                        <div className="w-4 h-4 bg-[#424242] rounded-full shadow-inner"></div>
                    </div>

                </div>
            </div>

            {/* 컨트롤 패널 (닉네임 + 버튼) */}
            <div className="flex flex-col items-center gap-6 w-full max-w-md px-4 z-10">

                <input
                    type="text"
                    placeholder="마인크래프트 닉네임 (예: Doidori)"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    disabled={isSpinning || hasPlayedToday}
                    className="w-full px-4 py-4 bg-[#424242] border-[4px] border-[#1C1C1C] text-white text-center text-lg font-bold focus:outline-none focus:border-[#BDBDBD] transition-colors shadow-[inset_4px_4px_0_rgba(0,0,0,0.4)] disabled:opacity-50"
                />

                <div className="h-8">
                    <p className={`text-xl font-bold drop-shadow-[2px_2px_0_#000] ${hasPlayedToday ? 'text-red-400' : 'text-yellow-400'}`}>
                        {resultMessage}
                    </p>
                </div>

                <button
                    onClick={spinRoulette}
                    disabled={isSpinning || hasPlayedToday}
                    className="w-3/4 py-4 bg-[#BDBDBD] border-[4px] border-[#1C1C1C] text-white text-3xl uppercase tracking-wider transition-all
                    shadow-[inset_4px_4px_0_rgba(255,255,255,0.4),inset_-4px_-4px_0_rgba(0,0,0,0.3),0_6px_0_#1C1C1C,0_10px_15px_rgba(0,0,0,0.5)] 
                    active:translate-y-1.5 active:shadow-[inset_4px_4px_0_rgba(255,255,255,0.4),inset_-4px_-4px_0_rgba(0,0,0,0.3),0_0px_0_#1C1C1C,0_5px_10px_rgba(0,0,0,0.5)]
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[inset_4px_4px_0_rgba(255,255,255,0.4),inset_-4px_-4px_0_rgba(0,0,0,0.3),0_6px_0_#1C1C1C]"
                    style={{ fontWeight: 900, textShadow: '3px 3px 0 #000' }}>
                    스핀!
                </button>
            </div>
        </div>
    );
}