import { useState } from 'react';

import iconLike from '../assets/icon-좋아요.png';
import iconBubble from '../assets/icon-말풍선.png';
import profile1 from '../assets/User5.png';
import profile2 from '../assets/User12.png';
import profile3 from '../assets/User9.png';
import profile4 from '../assets/User2.png';
import profile5 from '../assets/User6.png';
import profile6 from '../assets/User11.png';
import profile7 from '../assets/User3.png';
import thumbNight from '../assets/users_screenshots/User12(밤하늘).png';
import thumbCow from '../assets/users_screenshots/User12(소).png';
import thumbUser2 from '../assets/users_screenshots/User2.png';
import thumbUser3 from '../assets/users_screenshots/User3.png';
import thumbUser5 from '../assets/users_screenshots/User5.png';
import thumbUser6 from '../assets/users_screenshots/User6.png';
import thumbUser9 from '../assets/users_screenshots/User9.png';
import thumbUser11 from '../assets/users_screenshots/User11.png';

// 메인 갤러리(M-Side) 더미 데이터
const communityPosts = [
  { id: 1, type: '창작물 갤러리', author: 'User12', title: '아름다운 밤 하늘', likes: 21, comments: 12, date: '2026-03-22T21:41:07', profile: profile2, thumb: thumbNight },
  { id: 2, type: '자유게시판', author: 'User11', title: '고슴도치', likes: 23, comments: 17, date: '2026-03-21T19:22:10', profile: profile6, thumb: thumbUser11 },
  { id: 3, type: '유저 이벤트', author: 'User6', title: '소야 사랑해', likes: 5, comments: 9, date: '2026-03-21T20:56:40', profile: profile5, thumb: thumbUser6 },
  { id: 4, type: '실시간 공략', author: 'User2', title: '고뇌하는 유저 포..', likes: 2, comments: 1, date: '2026-03-20T00:19:33', profile: profile4, thumb: thumbUser2 },
  { id: 5, type: '창작물 갤러리', author: 'User9', title: '낚시터 좋아~!', likes: 36, comments: 15, date: '2026-03-19T19:28:43', profile: profile3, thumb: thumbUser9 },
  { id: 6, type: '창작물 갤러리', author: 'User3', title: '징징이 동상', likes: 6, comments: 11, date: '2026-03-19T16:36:39', profile: profile7, thumb: thumbUser3 },
  { id: 7, type: '자유게시판', author: 'User12', title: '야생 소 발견!', likes: 8, comments: 1, date: '2026-03-18T21:40:50', profile: profile2, thumb: thumbCow },
  { id: 8, type: '실시간 공략', author: 'User5', title: '농사하는 유저', likes: 17, comments: 12, date: '2026-03-18T20:01:20', profile: profile1, thumb: thumbUser5 },
  { id: 9, type: '창작물 갤러리', author: 'BuilderKing', title: '1년 걸려 만든 성', likes: 128, comments: 45, date: '2026-03-17T12:00:00', profile: profile5, thumb: thumbNight },
  { id: 10, type: '실시간 공략', author: 'NewbieHelper', title: '초보자 돈 버는 법', likes: 89, comments: 22, date: '2026-03-16T15:30:00', profile: profile4, thumb: thumbUser2 },
  { id: 11, type: '유저 이벤트', author: 'RichMan', title: '다이아 100개 뿌림', likes: 300, comments: 150, date: '2026-03-15T18:00:00', profile: profile1, thumb: thumbUser9 },
  { id: 12, type: '자유게시판', author: 'Miner123', title: '오늘 광산 득템샷', likes: 15, comments: 3, date: '2026-03-14T09:20:00', profile: profile3, thumb: thumbUser6 },
  { id: 13, type: '창작물 갤러리', author: 'PixelArt', title: '도트 아트 찍어봄', likes: 77, comments: 14, date: '2026-03-13T22:15:00', profile: profile6, thumb: thumbUser3 },
  { id: 14, type: '자유게시판', author: 'SadStory', title: '용암에 다 빠뜨림...', likes: 205, comments: 88, date: '2026-03-12T14:40:00', profile: profile7, thumb: thumbCow },
  { id: 15, type: '실시간 공략', author: 'ProGamer', title: '보스 레이드 패턴', likes: 45, comments: 9, date: '2026-03-11T11:11:00', profile: profile2, thumb: thumbUser11 },
  { id: 16, type: '유저 이벤트', author: 'HideAndSeek', title: '숨바꼭질 하실 분?', likes: 22, comments: 19, date: '2026-03-10T20:20:00', profile: profile5, thumb: thumbNight },
];

// ⭐ 오른쪽 사이드(R-Side) 스크롤 확인을 위해 데이터를 20개로 대폭 늘렸습니다.
const realtimePosts = [
  { id: 101, category: '자유', author: 'User4', title: '엔더시티 어느 방향으로 가야지 덜 털리나요?', time: '1시간', comments: 1 },
  { id: 102, category: '공략', author: 'User1', title: '전직 몬스터 사냥터 추천 드립니다.', time: '1시간', comments: 11 },
  { id: 103, category: '이벤트', author: 'User7', title: '지금 닭 도박 이벤트 중이에요! 많은 참여...', time: '1시간', comments: 5 },
  { id: 104, category: '자유', author: 'User5', title: '이번 업데이트 날개 너무 마음에 들어요...', time: '1시간', comments: 0 },
  { id: 105, category: '공략', author: 'User2', title: '수박 농사 (최대 효율) 농장 만드는 법', time: '1시간', comments: 2 },
  { id: 106, category: '자유', author: 'IronMan', title: '철 광맥 찾기 너무 힘드네요 팁좀요', time: '2시간', comments: 8 },
  { id: 107, category: '창작', author: 'Artis', title: '우리 길드 마을 전경 찍어봤습니다.', time: '3시간', comments: 24 },
  { id: 108, category: '공략', author: 'Speedy', title: '이동속도 포션 재료 파밍 루트 정리', time: '4시간', comments: 15 },
  { id: 109, category: '자유', author: 'Newbie', title: '도타이쿤 처음인데 뭐부터 해야 하나요?', time: '5시간', comments: 32 },
  { id: 110, category: '이벤트', author: 'RichMan', title: '내일 저녁 8시 무기 나눔 이벤트 합니다', time: '5시간', comments: 45 },
  { id: 111, category: '공략', author: 'Miner', title: '다이아몬드 가장 잘 나오는 y좌표 분석', time: '6시간', comments: 19 },
  { id: 112, category: '자유', author: 'Creeper', title: '집 짓고 있었는데 크리퍼 터짐 하 ㅠㅠ', time: '7시간', comments: 7 },
  { id: 113, category: '창작', author: 'PixelArt', title: '마리오 도트아트 완성했습니다 보러오세요', time: '7시간', comments: 12 },
  { id: 114, category: '자유', author: 'Trader', title: '인챈트된 다이아 곡괭이 팝니다 제시요', time: '8시간', comments: 4 },
  { id: 115, category: '공략', author: 'ProGamer', title: '타이탄의 숲 솔플 클리어 영상 및 팁', time: '8시간', comments: 55 },
  { id: 116, category: '이벤트', author: 'GM_DoTai', title: '주말 깜짝 접속 보상 안내', time: '9시간', comments: 120 },
  { id: 117, category: '자유', author: 'SadStory', title: '용암에 다이아몬드 3세트 빠뜨린 썰', time: '10시간', comments: 88 },
  { id: 118, category: '창작', author: 'BuilderKing', title: '서버 스폰 지역 근처에 지은 대성당', time: '10시간', comments: 67 },
  { id: 119, category: '공략', author: 'Chef', title: '허기 안 닳는 최고 효율 음식 조합', time: '11시간', comments: 34 },
  { id: 120, category: '자유', author: 'NightOwl', title: '새벽반 안 자고 마크하는 사람 손~', time: '12시간', comments: 14 },
];

const getCategoryColor = (category) => {
  switch(category) {
    case '자유': return 'text-[#6DC9E3]';
    case '공략': return 'text-[#E6BE39]';
    case '이벤트': return 'text-[#E974C6]';
    default: return 'text-[#8DFF95]';
  }
};

function CategoryBtn({ text, isActive, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-[170px] h-[45px] rounded-[25px] flex items-center justify-center transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-[#7696A1] to-[#B7D6DB] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.25),-1px_6px_10px_rgba(0,0,0,0.25)] text-white scale-[0.98] border border-white/20' 
          : 'bg-gradient-to-r from-[#B7D6DB] via-[#94BDCA] to-[#B7D6DB] shadow-[-1px_6px_10px_rgba(0,0,0,0.25)] text-white/80 hover:-translate-y-1 hover:brightness-110 hover:text-white'
      }`}
    >
      <span className={`text-[20px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] transition-all ${isActive ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]' : ''}`}>
        {text}
      </span>
    </button>
  );
}

export default function Community() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [visibleCount, setVisibleCount] = useState(8);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setVisibleCount(8);
  };

  const categorizedPosts = activeCategory === '전체' 
    ? communityPosts 
    : communityPosts.filter(post => post.type === activeCategory);

  const sortedPosts = [...categorizedPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const displayedPosts = sortedPosts.slice(0, visibleCount);

  return (
    <>
      {/* ⭐ 해결책 2: 커스텀 스크롤바를 강제로 주입하는 <style> 태그 */}
      <style>
        {`
          /* 스크롤바 전체 너비 */
          .dtk-scrollbar::-webkit-scrollbar {
            width: 11px;
          }
          /* 스크롤바 배경 (Track) */
          .dtk-scrollbar::-webkit-scrollbar-track {
            background: #1A353D;
            border-radius: 20px;
            margin: 20px 0; /* 위아래 여백을 주어 피그마와 똑같게 만듦 */
          }
          /* 스크롤바 막대 (Thumb) */
          .dtk-scrollbar::-webkit-scrollbar-thumb {
            background: #89A5A7;
            border-radius: 20px;
            border: 2px solid #1A353D; /* 배경색과 같은 테두리를 주어 살짝 얇아보이게 함 */
          }
          /* 막대에 마우스 올렸을 때 */
          .dtk-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9DBCC1;
          }
        `}
      </style>

      <main 
        className="w-full flex-1 pt-[200px] pb-[100px] relative z-10 flex flex-col items-center" 
        style={{ background: 'linear-gradient(180deg, #7ABADB 23.56%, #9BD1D5 43.75%, #0F2432 100%)' }}
      >
        <h1 className="text-center text-white text-[60px] font-bold drop-shadow-[-1px_5px_7px_rgba(0,0,0,0.25)] mb-[28px]">
          커뮤니티
        </h1>

        <div className="w-[1564px] max-w-[95%]">
          
          <div className="flex items-center mb-6 pl-[8px]">
            <div className="flex gap-4">
              <CategoryBtn text="전체" isActive={activeCategory === '전체'} onClick={() => handleCategoryClick('전체')} />
              <CategoryBtn text="창작물 갤러리" isActive={activeCategory === '창작물 갤러리'} onClick={() => handleCategoryClick('창작물 갤러리')} />
              <CategoryBtn text="실시간 공략" isActive={activeCategory === '실시간 공략'} onClick={() => handleCategoryClick('실시간 공략')} />
              <CategoryBtn text="유저 이벤트" isActive={activeCategory === '유저 이벤트'} onClick={() => handleCategoryClick('유저 이벤트')} />
              <CategoryBtn text="자유게시판" isActive={activeCategory === '자유게시판'} onClick={() => handleCategoryClick('자유게시판')} />
            </div>
          </div>

          {/* ⭐ 해결책 1: items-stretch를 주어 양쪽 박스의 높이가 항상 똑같이 맞춰지게 함 */}
          <div className="flex gap-5 w-full items-stretch">
            
            {/* M-Side (왼쪽 메인 갤러리) */}
            <div className="w-[1081px] bg-gradient-to-b from-[#194D56] to-[#102A3E] rounded-[20px] p-[20px] flex flex-col items-center">
              
              <div className="grid grid-cols-4 gap-x-[15px] gap-y-5 w-full">
                {displayedPosts.map((post) => (
                  <div 
                    key={post.id}
                    className="w-[250px] h-[250px] rounded-[20px] shadow-[1px_7px_5px_rgba(0,0,0,0.25)] flex flex-col cursor-pointer hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-all duration-300 group"
                    style={{ background: 'linear-gradient(138.53deg, #496168 41.71%, #677F83 100%)' }}
                  >
                    <div className="w-full h-[165px] bg-white rounded-t-[20px] overflow-hidden relative">
                      <img src={post.thumb} alt="썸네일" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {/* 썸네일 안쪽 어두운 그라데이션 (텍스트 가독성) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="flex-1 px-3 py-2 flex items-center gap-3">
                      <img src={post.profile} alt="프로필" className="w-[55px] h-[55px] rounded-full drop-shadow-[-1px_2px_4px_rgba(0,0,0,0.25)] flex-shrink-0 bg-[#2A3F45] border-2 border-[#194D56]" />
                      
                      <div className="flex flex-col justify-center min-w-0 flex-1">
                        <p className="text-[#DEDEDE] text-[16px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] truncate">
                          {post.author}
                        </p>
                        <h3 className="text-[#EFEFEF] text-[18px] font-bold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] truncate mt-[2px]">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <img src={iconLike} alt="좋아요" className="w-[22px] h-[22px] object-contain" />
                            <span className="text-[#CDCDCD] text-[15px] font-medium drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img src={iconBubble} alt="댓글" className="w-[15px] h-[15px] object-contain drop-shadow-[-1px_2px_2px_rgba(0,0,0,0.25)]" />
                            <span className="text-[#CDCDCD] text-[15px] font-medium drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] ml-[2px]">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < sortedPosts.length && (
                <div className="mt-10 mb-2">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 8)} 
                    className="w-[160px] h-[48px] rounded-[15px] shadow-[1px_7px_5px_rgba(0,0,0,0.25)] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all" 
                    style={{ background: 'linear-gradient(138.53deg, #293E45 -0.19%, #3B5256 100%)' }}
                  >
                    <span className="text-[#EFEFEF] text-[19px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]">더 보기</span>
                  </button>
                </div>
              )}
              
              {displayedPosts.length === 0 && (
                <div className="w-full h-full flex items-center justify-center py-20">
                  <p className="text-white/70 text-2xl font-semibold">등록된 게시물이 없습니다.</p>
                </div>
              )}
            </div>

            {/* ⭐ R-Side (오른쪽 사이드 실시간 피드 박스) ⭐ */}
            {/* absolute 트릭을 사용하여 부모(왼쪽 박스)의 높이에 완벽하게 맞춰서 늘어나게 만듦 */}
            <div className="w-[463px] relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#43696E] to-[#132936] rounded-[20px] p-6 pr-4 overflow-y-auto dtk-scrollbar">
                
                <div className="sticky top-0 bg-gradient-to-b from-[#43696E] via-[#43696E] to-transparent pb-4 z-10">
                  <h2 className="text-white text-[24px] font-bold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] border-b border-white/10 pb-3">
                    실시간 피드
                  </h2>
                </div>
                
                <div className="flex flex-col gap-6 mt-2">
                  {realtimePosts.map((post) => (
                    <div key={post.id} className="flex flex-col gap-2 cursor-pointer group hover:bg-white/5 p-3 rounded-xl transition-colors -mx-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[19px] font-bold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] whitespace-nowrap ${getCategoryColor(post.category)}`}>
                          [{post.category}]
                        </span>
                        <h3 className="text-white text-[21px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] truncate group-hover:text-[#BBE1ED] transition-colors">
                          {post.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#ACACAC] text-[17px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]">
                          by {post.author} · {post.time}
                        </span>
                        <div className="flex items-center gap-1">
                          <img src={iconBubble} alt="댓글" className="w-[18px] h-[18px] opacity-70" />
                          <span className="text-[#ACACAC] text-[18px] font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]">
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}