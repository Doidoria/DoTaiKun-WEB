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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`w-full fixed top-0 left-0 z-[100] shadow-[0px_10px_10px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-500 ${
      isScrolled 
        ? 'bg-gradient-to-b from-[#4A727C]/95 to-[#6C97AB]/95 rounded-b-[10px]' 
        : 'bg-gradient-to-b from-[#6B97A1]/80 to-[#8BBCD5]/80 rounded-b-[15px]'
    }`}>
      <div className={`max-w-[1440px] mx-auto flex items-center justify-between px-10 transition-all duration-500 ${
        isScrolled ? 'h-[85px]' : 'h-[166px]'
      }`}>
        
        {/* 왼쪽 메뉴 그룹 */}
        <div className="flex gap-8">
          <NavButton title="소식" subtitle="NEWS" to="/news" isActive={currentPath === '/news'} isScrolled={isScrolled} />
          <NavButton title="게임정보" subtitle="GAME INFO" to="/gameinfo" isActive={currentPath === '/gameinfo'} isScrolled={isScrolled} />
        </div>

        {/* 중앙 로고 */}
        <div className={`flex items-center justify-center cursor-pointer transition-all duration-500 ${
          isScrolled ? 'w-[100px] h-[60px] hover:scale-105' : 'w-[212px] h-[127px] hover:scale-105'
        }`}>
          <Link to="/">
            <img src={logoImg} alt="도타이쿤 로고" className="w-full h-full object-contain drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)]" />
          </Link>
        </div>

        {/* 오른쪽 메뉴 그룹 */}
        <div className="flex gap-8">
          <NavButton title="커뮤니티" subtitle="COMMUNITY" to="/community" isActive={currentPath === '/community'} isScrolled={isScrolled} />
          <NavButton title="다운로드" subtitle="DOWNLOAD" to="/download" isActive={currentPath === '/download'} isScrolled={isScrolled} />
        </div>

      </div>
    </header>
  );
}