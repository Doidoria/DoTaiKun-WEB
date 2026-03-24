import bgImg from '../assets/메인페이지_배경.png';
import charImg from '../assets/메인_캐릭터.png';

export default function Hero() {
  return (
    <section 
      // 모바일에서는 h-auto로 줄이고 flex 배치, PC에서는 원래 디자인 유지
      className="relative w-full h-auto min-h-[600px] lg:h-[1047px] bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center justify-center pt-[100px] lg:pt-0"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-[1440px] w-full h-full mx-auto relative flex flex-col items-center">
        
        {/* 캐릭터 크기 및 위치 반응형 (PC에서만 절대 위치 사용) */}
        <div className="relative lg:absolute lg:left-[112px] lg:top-[202px] w-[240px] sm:w-[300px] lg:w-[401px] h-auto mt-10 mb-10 lg:mt-0 lg:mb-0 z-10">
          <img 
            src={charImg} 
            alt="마인크래프트 캐릭터" 
            className="w-full h-auto object-contain drop-shadow-[10px_10px_15px_rgba(0,0,0,0.5)] animate-float-slow" 
          />
        </div>

        {/* 버튼 크기 및 위치 반응형 (PC에서만 절대 위치 사용) */}
        <div className="relative lg:absolute lg:left-[515px] lg:top-[460px] z-20 mb-20 lg:mb-0">
          <a href="https://github.com/Doidoria/DoTaiKun-LauncherFiles/releases/download/%EB%9F%B0%EC%B2%982_v3.2_%EB%B0%B0%ED%8F%AC/DoTaiKun_Launcher_S2.exe" 
             target="_blank" rel="noopener noreferrer" className="inline-block">
            <button className="group w-[280px] sm:w-[350px] lg:w-[420px] h-[70px] sm:h-[80px] lg:h-[90px] rounded-[35px] bg-gradient-to-br from-[#84AFA1] to-[#3D7B83] shadow-[-1px_6px_10px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(132,175,161,0.6)] hover:brightness-110">
              <span className="text-white text-[26px] sm:text-[32px] lg:text-[40px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] tracking-wide group-hover:scale-105 transition-transform duration-300">
                지금 플레이하기
              </span>
            </button>
          </a>
        </div>

      </div>
    </section>
  );
}