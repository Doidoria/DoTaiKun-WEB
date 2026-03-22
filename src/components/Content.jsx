// src/components/Content.jsx
import iconBuild from '../assets/곡괭이.png';
import iconEcon from '../assets/톱니바퀴.png';
import iconTrade from '../assets/박스.png';

// 반복되는 3개의 카드를 깔끔하게 찍어내기 위한 미니 컴포넌트
function FeatureCard({ icon, title, desc }) {
  return (
    // 피그마의 conic-gradient 수치를 CSS 인라인 스타일로 정확히 구현 
    <div 
      className="w-[260px] h-[285px] rounded-[15px] shadow-[-1px_7px_10px_rgba(0,0,0,0.25)] flex flex-col items-center justify-start pt-6 transition-transform hover:-translate-y-2 cursor-pointer relative"
      style={{ background: 'conic-gradient(from 32.94deg at 58.08% 31.4%, #426A72 0deg, #33505D 219.81deg, #6F8E93 360deg)' }}
    >
      {/* 둥둥 떠 있는 아이콘 (곡괭이는 피그마처럼 살짝 기울임) */}
      <img 
        src={icon} 
        alt={title} 
        className={`w-[130px] h-[130px] object-contain drop-shadow-[5px_5px_10px_rgba(0,0,0,0.25)] mb-4 ${title === '무한한 건설' ? '-rotate-[5.68deg]' : ''}`} 
      />
      
      {/* 텍스트 영역 */}
      <h3 className="text-white text-[32px] font-semibold drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] mb-2">
        {title}
      </h3>
      <p className="text-[#D8D8D8] text-[15px] font-medium leading-tight text-center px-4 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
        {desc}
      </p>
    </div>
  );
}

export default function Content() {
  return (
    // 전체 콘텐츠 섹션 배경 (위에서 아래로 어두워지는 선형 그라데이션) 
    <section className="w-full h-[386px] bg-gradient-to-b from-[#194D56] to-[#102A3E] relative z-10 mt-[-450px]">
      
      {/* 1440px 중앙 정렬 컨테이너 (Flex로 카드 3개와 오른쪽 배너를 양분) */}
      <div className="max-w-[1440px] h-full mx-auto px-10 flex items-center justify-between">
        
        {/* 왼쪽: 기능 카드 3개 그룹 (gap-8로 사이 간격 일정하게 띄움) */}
        <div className="flex gap-8">
          <FeatureCard 
            icon={iconBuild} 
            title="무한한 건설" 
            desc="서버내 유저들의 건축물들 구경이 가능합니다." 
          />
          <FeatureCard 
            icon={iconEcon} 
            title="경제 시스템" 
            desc="도타이쿤 전용 경제 시스템 도입 수많은 컨텐츠 확보" 
          />
          <FeatureCard 
            icon={iconTrade} 
            title="글로벌 무역" 
            desc="독자적인 무역시스템 개발 마크에서도 주식을?!" 
          />
        </div>

        {/* 오른쪽: 최신 업데이트 배너 영역 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-[35px] font-semibold drop-shadow-[0px_5px_5px_rgba(0,0,0,0.25)] tracking-wide">
            UPDATE
          </h2>
          {/* 업데이트 썸네일 박스 */}
          <div className="w-[382px] h-[163px] bg-[#D9D9D9] rounded-[15px] overflow-hidden relative shadow-lg cursor-pointer group">
             {/* 임시 이미지 박스 (나중에 실제 썸네일 이미지 넣으세요) */}
             <div className="w-full h-full bg-black/20 group-hover:scale-105 transition-transform duration-300"></div>
          </div>
          {/* 날짜와 제목 */}
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#8DFF95] shadow-[0_0_8px_#8DFF95]"></span>
            <p className="text-white text-[22px] font-semibold drop-shadow-[0px_2px_3px_rgba(0,0,0,0.25)]">새로운 컨텐츠 오픈!</p>
          </div>
          <p className="text-[#D8D8D8] text-[17px] pl-4 font-medium drop-shadow-[0px_2px_3px_rgba(0,0,0,0.25)]">2026-03-06</p>
        </div>

      </div>
    </section>
  );
}