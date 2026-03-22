// src/components/Hero.jsx
import bgImg from '../assets/메인페이지_배경.png';
import charImg from '../assets/메인_캐릭터.png';

export default function Hero() {
  return (
    // 1. 전체 배경 섹션: 피그마 높이(1047px) 적용 및 배경 이미지 설정
    // 헤더가 투명하게 위에 겹쳐야 하므로 pt-[166px]로 내용물이 헤더에 가리지 않게 밀어줍니다.
    <section 
      className="relative w-full h-[1047px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* 2. 1440px 중앙 정렬 컨테이너: 이 안에서 캐릭터와 버튼의 위치를 잡습니다 */}
      <div className="max-w-[1440px] h-full mx-auto relative">
        
        {/* 메인 캐릭터 (피그마 좌표 계산 적용) */}
        {/* 1920 기준 left:352 -> 1440 컨테이너 기준 대략 left-[112px] */}
        <div className="absolute left-[112px] top-[202px] w-[401px] h-[527px]">
          <img 
            src={charImg} 
            alt="마인크래프트 캐릭터" 
            className="w-full h-full object-contain drop-shadow-2xl animate-bounce-slow" 
          />
        </div>

        {/* '지금 플레이하기' 메인 버튼 */}
        {/* 1920 기준 left:755 -> 1440 컨테이너 기준 대략 left-[515px] */}
        <div className="absolute left-[515px] top-[460px]">
          <button className="w-[420px] h-[90px] rounded-[35px] bg-gradient-to-br from-[#84AFA1] to-[#3D7B83] shadow-[-1px_6px_10px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[-2px_10px_15px_rgba(0,0,0,0.4)]">
            <span className="text-white text-[45px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] tracking-wide">
              지금 플레이하기
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}