import iconDiscord from '../assets/icon-불화.png'; 
import iconYoutube from '../assets/icon-유튜브.png';
import iconTwitter from '../assets/icon-트위터.png';

export default function Footer() {
  return (
    <footer className="w-full h-auto min-h-[511px] bg-gradient-to-b from-[#0B1F2B] to-[#050B14] flex flex-col justify-between py-10 md:py-[48px] relative z-20 mt-auto">
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 flex flex-col md:flex-row flex-wrap gap-10 lg:gap-0 justify-between mb-10 md:mb-0">
        
        {/* 1. 도타이쿤 소개 */}
        <div className="flex flex-col gap-3 md:gap-4 w-full md:w-1/4">
          <h2 className="text-white text-[28px] md:text-[32px] font-semibold drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]">
            도타이쿤
          </h2>
          <p className="text-[#B4B4B4] text-[16px] md:text-[20px] font-medium drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]">
            야생 경제와 RPG가 공존하는 세계를 플레이하세요.
          </p>
        </div>

        {/* 2. 빠른 링크 */}
        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-[#CFCFCF] text-[20px] md:text-[25px] font-semibold drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] mb-1 md:mb-2">
            빠른 링크
          </h3>
          <a href="#" className="text-[#CFCFCF] text-[18px] md:text-[25px] font-semibold hover:text-white transition-colors">소식</a>
          <a href="#" className="text-[#CFCFCF] text-[18px] md:text-[25px] font-semibold hover:text-white transition-colors">게임 가이드</a>
          <a href="#" className="text-[#CFCFCF] text-[18px] md:text-[25px] font-semibold hover:text-white transition-colors">고객 지원</a>
        </div>

        {/* 3. 법적 고지 */}
        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className="text-[#CFCFCF] text-[20px] md:text-[25px] font-semibold drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] mb-1 md:mb-2">
            법적 고지
          </h3>
          <a href="#" className="text-white text-[18px] md:text-[22px] font-semibold hover:text-[#8BBCD5] transition-colors">이용약관</a>
          <a href="#" className="text-white text-[18px] md:text-[22px] font-semibold hover:text-[#8BBCD5] transition-colors">개인정보처리방침</a>
        </div>

        {/* 4. 커뮤니티 & SNS */}
        <div className="flex flex-col gap-3 md:gap-4">
          <h3 className="text-[#CFCFCF] text-[24px] md:text-[30px] font-semibold drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)] mb-1 md:mb-2">
            커뮤니티
          </h3>
          <div className="flex gap-4">
            <a href="#" className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] hover:-translate-y-2 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">
              <img src={iconTwitter} alt="트위터" className="w-full h-full object-contain" />
            </a>
            <a href="#" className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] hover:-translate-y-2 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">
              <img src={iconYoutube} alt="유튜브" className="w-full h-full object-contain" />
            </a>
            <a href="#" className="w-[45px] h-[45px] md:w-[60px] md:h-[60px] hover:-translate-y-2 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">
              <img src={iconDiscord} alt="디스코드" className="w-full h-full object-contain" />
            </a>
          </div>
        </div>

      </div>

      {/* 5. 하단 카피라이트 */}
      <div className="w-full text-center mt-auto px-4">
        <p className="text-[#B4B4B4] text-[14px] md:text-[18px] font-medium drop-shadow-[0px_4px_2px_rgba(0,0,0,0.25)]">
          ⓒ 2026 DoTaiKun. All Rights Reserved. 개발 : DoTaiKun Team
        </p>
      </div>

    </footer>
  );
}