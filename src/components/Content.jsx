import { useState, useEffect, useRef } from 'react';

import iconBuild from '../assets/곡괭이.png';
import iconEcon from '../assets/톱니바퀴.png';
import iconTrade from '../assets/박스.png';

import imgUpdate1 from '../assets/ATContest.png';
import imgUpdate2 from '../assets/Goblin.png';
import imgUpdate3 from '../assets/titan.png';

function FeatureCard({ icon, title, desc }) {
  return (
    <div 
      className="w-[260px] h-[285px] rounded-[15px] shadow-[-1px_7px_10px_rgba(0,0,0,0.25)] flex flex-col items-center justify-start pt-6 transition-transform hover:-translate-y-2 cursor-pointer relative"
      style={{ background: 'conic-gradient(from 32.94deg at 58.08% 31.4%, #426A72 0deg, #33505D 219.81deg, #6F8E93 360deg)' }}
    >
      <img 
        src={icon} 
        alt={title} 
        className={`w-[130px] h-[130px] object-contain drop-shadow-[5px_5px_10px_rgba(0,0,0,0.25)] mb-4 ${title === '무한한 건설' ? '-rotate-[5.68deg]' : ''}`} 
      />
      <h3 className="text-white text-[32px] font-semibold drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)] mb-2">
        {title}
      </h3>
      <p className="text-[#D8D8D8] text-[15px] font-medium leading-tight text-center px-4 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
        {desc}
      </p>
    </div>
  );
}

const updateData = [  
  { id: 1, img: imgUpdate1, title: '제1회 건축 대회 개최!', date: '2026-03-20', link: '/contest' },  
  { id: 2, img: imgUpdate2, title: '황금 고블린의 숲 오픈', date: '2026-03-17', link: '/news' },  
  { id: 3, img: imgUpdate3, title: '신규 레이드: 타이탄', date: '2026-03-11', link: '/news' },  
];  
  
export default function Content() {  
  const [currentIndex, setCurrentIndex] = useState(0);  
  
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  
  useEffect(() => {  
    const timer = setInterval(() => {  
      setCurrentIndex((prevIndex) => (prevIndex + 1) % updateData.length);  
    }, 3000);  
    return () => clearInterval(timer);  
  }, [currentIndex]);
  
  // 2. 드래그 시작 (마우스 누름 or 터치 시작)
  const handleDragStart = (e) => {
    isDragging.current = false;
    dragStartX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  };

  // 3. 드래그 끝 (마우스 뗌 or 터치 끝) - 이동 거리 계산
  const handleDragEnd = (e) => {
    const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
    const diff = dragStartX.current - endX;

    // 50px 이상 드래그 했을 때만
    if (Math.abs(diff) > 50) {
      isDragging.current = true;
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % updateData.length);
      } else {
        setCurrentIndex((prev) => (prev === 0 ? updateData.length - 1 : prev - 1));
      }
    }
  };

  // 4. 클릭 이벤트 겹침 방지
  const handleClick = (e) => {
    if (isDragging.current) {
      e.preventDefault();
    }
  };

  return (  
    <section className="w-full h-[386px] bg-gradient-to-b from-[#194D56] to-[#102A3E] relative z-10 mt-[-450px]">  
      <div className="max-w-[1440px] h-full mx-auto px-20 flex items-center justify-between overflow-hidden">  
        <div className="flex gap-8 flex-shrink-0">  
          <FeatureCard icon={iconBuild} title="무한한 건설" desc="서버내 유저들의 건축물들 구경이 가능합니다." />  
          <FeatureCard icon={iconEcon} title="경제 시스템" desc="도타이쿤 전용 경제 시스템 도입 수많은 컨텐츠 확보" />  
          <FeatureCard icon={iconTrade} title="글로벌 무역" desc="독자적인 무역시스템 개발 마크에서도 주식을?!" />  
        </div>  
        
        {/* 오른쪽: 최신 업데이트 배너 영역 */}  
        <div className="flex flex-col gap-4 flex-shrink-0 relative w-[382px]">  
          <h2 className="text-white text-[35px] font-semibold drop-shadow-[0px_5px_5px_rgba(0,0,0,0.25)] tracking-wide">  
            UPDATE  
          </h2>  
            
          {/* 마우스 및 터치 이벤트 */}
          <div 
            className="w-[382px] h-[290px] overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={(e) => { if(e.buttons === 1) handleDragEnd(e) }}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >  
            <div   
              className="flex transition-transform duration-500 ease-out w-full"   
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}  
            >  
              {updateData.map((data) => (  
                <a 
                  key={data.id} 
                  href={data.link} 
                  onClick={handleClick}
                  draggable="false"
                  className="w-full flex-shrink-0 block relative group/item select-none"
                >  
                  <div className="w-full h-[213px] bg-black/20 overflow-hidden relative rounded-[15px] shadow-lg">  
                    <img   
                      src={data.img}   
                      alt={data.title}   
                      draggable="false"
                      className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"   
                    />  
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-[22px] drop-shadow-md">
                        {data.id === 1 ? "🏆 콘테스트 투표하기" : "자세히 보기"}
                      </span>
                    </div>
                  </div>  
                    
                  <div className="flex flex-col gap-1 mt-[10px]">  
                    <div className="flex items-center gap-2 pl-2">  
                      <span className="w-2 h-2 rounded-full bg-[#8DFF95] shadow-[0_0_8px_#8DFF95]"></span>  
                      <p className="text-white text-[20px] font-semibold drop-shadow-[0px_2px_3px_rgba(0,0,0,0.25)] truncate w-[350px]">  
                        {data.title}  
                      </p>  
                    </div>  
                    <p className="text-[#D8D8D8] text-[15px] pl-4 font-medium drop-shadow-[0px_2px_3px_rgba(0,0,0,0.25)]">  
                      {data.date}  
                    </p>  
                  </div>  
                </a>  
              ))}  
            </div>  
  
            <div className="absolute top-[185px] right-3 flex gap-2 z-20">  
              {updateData.map((_, index) => (  
                <div   
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`cursor-pointer w-2 h-2 rounded-full transition-all ${  
                    currentIndex === index ? 'bg-white shadow-[0_0_8px_white] scale-110' : 'bg-black/50 border border-white/50 hover:bg-white/80'  
                  }`}  
                />  
              ))}  
            </div>  
          </div>  
        </div>  
      </div>  
    </section>  
  );  
}