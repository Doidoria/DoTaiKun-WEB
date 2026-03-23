import bgImg from '../assets/메인페이지_배경.png';
import charImg from '../assets/메인_캐릭터.png';

export default function Hero() {
  return (
    <section 
      className="relative w-full h-[1047px] bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="max-w-[1440px] h-full mx-auto relative">
        
        {/* 메인 캐릭터: animate-float-slow 적용으로 둥둥 떠다니게 만듦 */}
        <div className="absolute left-[112px] top-[202px] w-[401px] h-[527px]">
          <img 
            src={charImg} 
            alt="마인크래프트 캐릭터" 
            className="w-full h-full object-contain drop-shadow-[10px_10px_15px_rgba(0,0,0,0.5)] animate-float-slow" 
          />
        </div>

        {/* '지금 플레이하기' 메인 버튼: hover 시 빛나는 효과 추가 */}
        <div className="absolute left-[515px] top-[460px]">
          <a href="https://github.com/Doidoria/DoTaiKun-LauncherFiles/releases/download/%EB%9F%B0%EC%B2%982_v3.2_%EB%B0%B0%ED%8F%AC/DoTaiKun_Launcher_S2.exe" 
            target="_blank" rel="noopener noreferrer" className="inline-block">
            <button className="group w-[420px] h-[90px] rounded-[35px] bg-gradient-to-br from-[#84AFA1] to-[#3D7B83] shadow-[-1px_6px_10px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(132,175,161,0.6)] hover:brightness-110">
              <span className="text-white text-[40px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] tracking-wide group-hover:scale-105 transition-transform duration-300">
                지금 플레이하기
              </span>
            </button>
          </a>
        </div>

      </div>
    </section>
  );
}