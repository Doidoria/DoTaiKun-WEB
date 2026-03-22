// src/components/News.jsx
import { useState } from 'react';

// ⭐ 1. 자산(assets) 폴더에서 돋보기와 썸네일 이미지들을 불러옵니다. (파일명 오타 주의!)
import iconSearch from '../assets/icon-돋보기.png';
import imgNotice from '../assets/소식(공지&점검).png';
import imgUpdateContent from '../assets/소식(업데이트-내용).png';
import imgUpdateDungeon from '../assets/소식(업데이트-던전).png';
import imgEvent from '../assets/소식(이벤트).png';

// ⭐ 2. newsData에 각 게시글 성격에 맞는 이미지(imgSrc)를 추가로 달아줍니다.
const newsData = [
  { id: 1, type: '공지사항', title: '서버 점검 안내', desc: '더욱 안정적인 서비스를 위해 정기 서버 점검이 진행될 예정입니다. 점검 시간 동안에는 게임 접속 및 플레이가 불가능하오니, 이용에 참고하시기 바랍니다.', date: '2026-02-28', color: 'text-[#F47373]', imgSrc: imgNotice },
  { id: 2, type: '이벤트', title: '낚시 이벤트', desc: '강가에서 희귀한 물고기를 낚아보세요! 낚시 포인트로 전용 상점에 있는 마인크래프트 전용 전설 장비와 교환할 수 있습니다.', date: '2026-03-01', color: 'text-[#73F482]', imgSrc: imgEvent },
  { id: 3, type: '업데이트', title: '장비 강화소', desc: '장비 강화소 확률 조정 수정되었습니다. 이제 더 이상 강화 실패 시 아이템이 파괴되지 않으며, 대신 강화 수치가 1단계만 하락합니다.', date: '2026-03-02', color: 'text-[#F4E973]', imgSrc: imgUpdateContent },
  { id: 4, type: '업데이트', title: '경제 시스템', desc: '상점 품목 업데이트 되었습. 이제 모든 유저들은 자신의 개인 상점을 열 수 있으며, 다른 유저들과 자유롭게 거래할 수 있습니다.', date: '2026-03-03', color: 'text-[#F4E973]', imgSrc: imgUpdateContent },
  { id: 5, type: '이벤트', title: '핫타임 이벤트', desc: '매일 오후 10시에 실시 됩. 이 시간 동안 접속한 모든 유저들에게는 경험치 2배 버프와 랜덤 상자 1개가 지급됩니다.', date: '2026-03-03', color: 'text-[#73F482]', imgSrc: imgEvent },
  { id: 6, type: '업데이트', title: '타이탄의 숲', desc: '7차 전직을 위한 한걸음 나. 신규 던전 "타이탄의 숲"이 오픈되었습니다. 이 던전에서는 7차 전직에 필요한 재료 아이템인 "타이탄의 심장"을 얻을 수 있습니다.', date: '2026-03-05', color: 'text-[#F4E973]', imgSrc: imgUpdateDungeon },
  { id: 7, type: '공지사항', title: '불법 프로그램 제재 안내', desc: '쾌적한 게임 환경을 위해. 비정상적인 방법으로 게임을 이용하는 유저들에 대해 강력한 제재 조치가 취해졌습니다.', date: '2026-03-05', color: 'text-[#F47373]', imgSrc: imgNotice },
  { id: 8, type: '업데이트', title: '황금 고블린의 숲', desc: '자신의 강함으로 골드를 벌. 신규 사냥터 "황금 고블린의 숲"이 오픈되었습니다. 이곳에서 몬스터를 사냥하면 평소보다 2배 더 많은 골드를 획득할 수 있습니다.', date: '2026-03-06', color: 'text-[#F4E973]', imgSrc: imgUpdateDungeon },
  { id: 9, type: '공지사항', title: '디스코드 연동 오류 안내', desc: '현재 디스코드 봇 연동에. 일부 유저들의 디스코드 계정과 게임 연동에 오류가 발생하고 있습니다. 조속히 해결하겠습니다.', date: '2026-03-06', color: 'text-[#F47373]', imgSrc: imgNotice },
  { id: 10, type: '이벤트', title: '주말 경험치 2배', desc: '이번 주말은 성장의 기회! 접속만 해도 폭풍 레벨업 가능!', date: '2026-03-07', color: 'text-[#73F482]', imgSrc: imgEvent },
  { id: 11, type: '업데이트', title: '신규 광물 티타늄 추가', desc: '더 강력한 장비를 만드세요. 땅속 깊은 곳에서 채굴 가능.', date: '2026-03-08', color: 'text-[#F4E973]', imgSrc: imgUpdateContent },
  { id: 12, type: '공지사항', title: '1.2 패치노트', desc: '다양한 버그가 수정되었으며, 직업 밸런스가 패치되었습니다.', date: '2026-03-09', color: 'text-[#F47373]', imgSrc: imgNotice },
  { id: 13, type: '이벤트', title: '건축 대회 개최', desc: '최고의 건축가를 찾습니다. 1등에게는 한정판 칭호 지급!', date: '2026-03-10', color: 'text-[#73F482]', imgSrc: imgEvent },
  { id: 14, type: '업데이트', title: '길드 시스템 개편', desc: '길드원과 함께 성장하세요. 길드 아지트 기능이 추가됩니다.', date: '2026-03-12', color: 'text-[#F4E973]', imgSrc: imgUpdateContent },
  { id: 15, type: '공지사항', title: '서버 호스팅 이전 안내', desc: '더욱 쾌적한 환경을 위해 고성능 서버로 데이터가 이전됩니다.', date: '2026-03-14', color: 'text-[#F47373]', imgSrc: imgNotice },
  { id: 16, type: '이벤트', title: '복귀 유저 환영 이벤트', desc: '오랜만에 오신 분들께 드리는 특별한 정착 지원 아이템!', date: '2026-03-15', color: 'text-[#73F482]', imgSrc: imgEvent },
  { id: 17, type: '업데이트', title: 'UI 디자인 개편', desc: '더 직관적인 화면으로 인터페이스가 대대적으로 변경되었습니다.', date: '2026-03-16', color: 'text-[#F4E973]', imgSrc: imgUpdateContent },
  { id: 18, type: '공지사항', title: '운영자 사칭 주의', desc: '운영자는 절대 비밀번호를 요구하지 않습니다. 사기에 주의하세요.', date: '2026-03-18', color: 'text-[#F47373]', imgSrc: imgNotice },
  { id: 19, type: '업데이트', title: '신규 레이드 보스', desc: '강력한 드래곤이 깨어났습니다. 최소 10인 이상의 파티 권장.', date: '2026-03-20', color: 'text-[#F4E973]', imgSrc: imgUpdateDungeon },
  { id: 20, type: '이벤트', title: '봄맞이 출석 체크', desc: '매일 접속하고 보상 받자! 7일 연속 출석 시 특별 스킨 지급.', date: '2026-03-21', color: 'text-[#73F482]', imgSrc: imgEvent },
];

function CategoryBtn({ text, isActive, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-[150px] h-[45px] rounded-[25px] flex items-center justify-center transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-[#7696A1] to-[#94BDCA] shadow-[inset_2px_4px_8px_rgba(0,0,0,0.4)] text-white scale-95 border border-white/20' 
          : 'bg-gradient-to-r from-[#B7D6DB] to-[#94BDCA] shadow-[0px_6px_10px_rgba(0,0,0,0.2)] text-white/80 hover:-translate-y-1 hover:brightness-110 hover:text-white'
      }`}
    >
      <span className={`text-[20px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] transition-all ${isActive ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]' : ''}`}>
        {text}
      </span>
    </button>
  );
}

export default function News() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [visibleCount, setVisibleCount] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setVisibleCount(9);
  };

  const categorizedNews = activeCategory === '전체' 
    ? newsData 
    : newsData.filter(item => item.type === activeCategory);

  const filteredNews = categorizedNews.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNews = [...filteredNews].sort((a, b) => new Date(b.date) - new Date(a.date));
  const displayedNews = sortedNews.slice(0, visibleCount);

  return (
    <main 
      className="w-full flex-1 pt-[200px] pb-[100px] relative z-10 flex flex-col items-center" 
      style={{ background: 'linear-gradient(180deg, #7ABADB 23.56%, #9BD1D5 43.75%, #0F2432 100%)' }}
    >
      <h1 className="text-center text-white text-[60px] font-bold drop-shadow-[-1px_5px_7px_rgba(0,0,0,0.25)] mb-[28px]">
        소식
      </h1>

      <div className="w-[1278px]">
        {/* 상단 툴바 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <CategoryBtn text="전체" isActive={activeCategory === '전체'} onClick={() => handleCategoryClick('전체')} />
            <CategoryBtn text="공지사항" isActive={activeCategory === '공지사항'} onClick={() => handleCategoryClick('공지사항')} />
            <CategoryBtn text="업데이트" isActive={activeCategory === '업데이트'} onClick={() => handleCategoryClick('업데이트')} />
            <CategoryBtn text="이벤트" isActive={activeCategory === '이벤트'} onClick={() => handleCategoryClick('이벤트')} />
          </div>

          <div className="w-[294px] h-[45px] rounded-[10px] bg-gradient-to-r from-[#BBE1ED] to-[#B4DCE8] shadow-[-1px_6px_10px_rgba(0,0,0,0.25)] flex items-center px-4">
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(9);
              }}
              placeholder="검색"
              className="w-full bg-transparent text-white text-[20px] font-medium placeholder:text-white/70 outline-none drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]"
            />
            {/* ⭐ 3. 불러온 돋보기 아이콘 적용 */}
            <img src={iconSearch} alt="검색" className="w-6 h-6 object-contain flex-shrink-0 ml-2 drop-shadow-md" />
          </div>
        </div>

        {/* 게시판 메인 박스 */}
        <div className="w-full h-auto bg-gradient-to-b from-[#194D56] to-[#102A3E] rounded-[20px] p-[20px] pb-10 flex flex-col items-center">
          
          <div className="grid grid-cols-3 gap-x-5 gap-y-6">
            {displayedNews.map((item) => (
              <div 
                key={item.id}
                className="w-[398px] h-[149px] rounded-[20px] shadow-[1px_7px_5px_rgba(0,0,0,0.25)] flex items-center p-4 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                style={{ background: 'linear-gradient(138.53deg, #496168 41.71%, #677F83 100%)' }}
              >
                {/* ⭐ 4. 빈 박스 지우고 매핑된 썸네일(item.imgSrc) 적용 */}
                <img 
                  src={item.imgSrc} 
                  alt="썸네일" 
                  className="w-[125px] h-[115px] object-cover rounded-[15px] shadow-[-1px_5px_10px_rgba(0,0,0,0.25)] flex-shrink-0" 
                />
                
                <div className="ml-4 flex flex-col justify-between h-[107px] w-[217px]">
                  <div>
                    <span className={`${item.color} text-[18px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]`}>
                      [{item.type}]
                    </span>
                    <h2 className="text-[#EFEFEF] text-[21px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] mt-1 truncate w-full">
                      {item.title}
                    </h2>
                  </div>
                  <div>
                    <p className="text-[#DEDEDE] text-[17px] font-medium drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] truncate w-full">
                      {item.desc}
                    </p>
                    <p className="text-[#DEDEDE] text-[17px] font-medium drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] mt-1">
                      {item.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayedNews.length === 0 && (
            <div className="w-full text-center py-20">
              <p className="text-white/70 text-2xl font-semibold">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>

        {/* Load More 버튼 */}
        {visibleCount < sortedNews.length && (
          <div className="w-full flex justify-center mt-8">
            <button 
              onClick={() => setVisibleCount(prev => prev + 9)} 
              className="w-[160px] h-[48px] rounded-[15px] shadow-[1px_7px_5px_rgba(0,0,0,0.25)] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all" 
              style={{ background: 'linear-gradient(138.53deg, #293E45 -0.19%, #3B5256 100%)' }}
            >
              <span className="text-[#EFEFEF] text-[19px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]">Load More</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}