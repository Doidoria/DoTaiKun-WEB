import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/DoTaiKun_Logo.png';

function NavButton({ title, subtitle, to, isActive, isScrolled }) {
  return (
    <Link 
      to={to} 
      className={`rounded-[15px] flex flex-col items-center justify-center transition-all duration-300 shadow-[-1px_6px_10px_rgba(0,0,0,0.25)] ${
        isScrolled ? 'w-[120px] h-[55px]' : 'w-[151px] h-[80px]'
      } ${
        isActive 
          ? 'bg-gradient-to-r from-[#7696A1] to-[#94BDCA] shadow-[inset_2px_4px_8px_rgba(0,0,0,0.4)] scale-[0.96] border border-white/20' 
          : 'bg-gradient-to-r from-[#9DBCC1] via-[#7C9CA6] to-[#9DBCC1] hover:scale-105 hover:brightness-110' 
      }`}
    >
      <span className={`font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] leading-tight transition-all duration-300 ${
        isScrolled ? 'text-[18px]' : 'text-[25px]'
      } ${isActive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'text-white'}`}>
        {title}
      </span>
      <span className={`font-semibold drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] transition-all duration-300 ${
        isScrolled ? 'text-[12px]' : 'text-[17px]'
      } ${isActive ? 'text-white/90' : 'text-white'}`}>
        {subtitle}
      </span>
    </Link>
  );
}

export default function Header() {
  const location = useLocation(); 
  const currentPath = location.pathname; 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 left-0 z-[100] shadow-[0px_10px_10px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-b from-[#4A727C]/95 to-[#6C97AB]/95 rounded-b-[10px]' 
        : 'bg-gradient-to-b from-[#6B97A1]/80 to-[#8BBCD5]/80 rounded-b-[15px]'
    }`}>
      <div className={`max-w-[1440px] mx-auto flex items-center justify-between px-5 transition-all duration-500 ${
        isScrolled ? 'h-[70px] md:h-[85px]' : 'h-[90px] md:h-[166px]'
      }`}>
        
        {/* [모바일/태블릿] 좌측 여백 보정 (로고 중앙 정렬용) */}
        <div className="lg:hidden w-[40px]"></div>

        {/* [PC] 왼쪽 메뉴 그룹 */}
        <div className="hidden lg:flex gap-8">
          <NavButton title="소식" subtitle="NEWS" to="/news" isActive={currentPath === '/news'} isScrolled={isScrolled} />
          <NavButton title="게임정보" subtitle="GAME INFO" to="/gameinfo" isActive={currentPath === '/gameinfo'} isScrolled={isScrolled} />
        </div>

        {/* 중앙 로고 */}
        <div className={`flex items-center justify-center cursor-pointer transition-all duration-500 ${
          isScrolled ? 'w-[80px] h-[50px] md:w-[100px] md:h-[60px] hover:scale-105' : 'w-[140px] h-[85px] md:w-[212px] md:h-[127px] hover:scale-105'
        }`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={logoImg} alt="도타이쿤 로고" className="w-full h-full object-contain drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)]" />
          </Link>
        </div>

        {/* [PC] 오른쪽 메뉴 그룹 */}
        <div className="hidden lg:flex gap-8">
          <NavButton title="커뮤니티" subtitle="COMMUNITY" to="/community" isActive={currentPath === '/community'} isScrolled={isScrolled} />
          <NavButton title="다운로드" subtitle="DOWNLOAD" to="/download" isActive={currentPath === '/download'} isScrolled={isScrolled} />
        </div>

        {/* [모바일/태블릿] 우측 햄버거 메뉴 버튼 */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden w-[40px] h-[40px] flex items-center justify-center text-white text-3xl focus:outline-none drop-shadow-md"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* [모바일/태블릿] 열렸을 때 나오는 세로형 드롭다운 메뉴 */}
      <div className={`lg:hidden w-full bg-[#194D56]/95 backdrop-blur-lg flex flex-col items-center gap-6 overflow-hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-[300px] py-6 border-t border-white/20 rounded-b-[20px] shadow-xl' : 'max-h-0 py-0'
      }`}>
        <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-[22px] font-bold drop-shadow-md">소식</Link>
        <Link to="/gameinfo" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-[22px] font-bold drop-shadow-md">게임정보</Link>
        <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-[22px] font-bold drop-shadow-md">커뮤니티</Link>
        <Link to="/download" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-[22px] font-bold drop-shadow-md">다운로드</Link>
      </div>
    </header>
  );
}