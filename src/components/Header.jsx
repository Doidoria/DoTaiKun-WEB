import logoImg from '../assets/DoTaiKun_Logo.png';

// 반복되는 메뉴 버튼을 깔끔하게 관리하기 위한 미니 컴포넌트
function NavButton({ title, subtitle }) {
  return (
    <button className="w-[151px] h-[80px] rounded-[15px] flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105 hover:brightness-110 shadow-[-1px_6px_10px_rgba(0,0,0,0.25)] bg-gradient-to-r from-[#9DBCC1] via-[#7C9CA6] to-[#9DBCC1]">
      <span className="text-white font-semibold text-[25px] drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] leading-tight">
        {title}
      </span>
      <span className="text-white font-semibold text-[17px] drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]">
        {subtitle}
      </span>
    </button>
  );
}

export default function Header() {
  return (
    <header className="w-full absolute top-0 left-0 z-50 rounded-b-[15px] shadow-[0px_10px_10px_rgba(0,0,0,0.25)] bg-gradient-to-b from-[#6B97A1]/50 to-[#8BBCD5]/50 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto h-[166px] flex items-center justify-between px-10">
        
        {/* 왼쪽 메뉴 그룹 */}
        <div className="flex gap-8">
          <NavButton title="소식" subtitle="NEWS" />
          <NavButton title="게임정보" subtitle="GAME INFO" />
        </div>

        {/* 중앙 로고 영역 */}
        <div className="w-[212px] h-[127px] flex items-center justify-center">
          <img src={logoImg} alt="도타이쿤 로고" className="w-full h-full object-contain" />
        </div>

        {/* 오른쪽 메뉴 그룹 */}
        <div className="flex gap-8">
          <NavButton title="커뮤니티" subtitle="COMMUNITY" />
          <NavButton title="다운로드" subtitle="DOWNLOAD" />
        </div>

      </div>
    </header>
  );
}