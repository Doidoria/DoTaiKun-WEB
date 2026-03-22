import { Link } from 'react-router-dom';
import logoImg from '../assets/DoTaiKun_Logo.png';

function NavButton({ title, subtitle, to }) {
  return (
    <Link 
      to={to} 
      className="w-[151px] h-[80px] rounded-[15px] flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105 hover:brightness-110 shadow-[-1px_6px_10px_rgba(0,0,0,0.25)] bg-gradient-to-r from-[#9DBCC1] via-[#7C9CA6] to-[#9DBCC1]"
    >
      <span className="text-white font-semibold text-[25px] drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)] leading-tight">
        {title}
      </span>
      <span className="text-white font-semibold text-[17px] drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]">
        {subtitle}
      </span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="w-full absolute top-0 left-0 z-50 rounded-b-[15px] shadow-[0px_10px_10px_rgba(0,0,0,0.25)] bg-gradient-to-b from-[#6B97A1]/50 to-[#8BBCD5]/50 backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto h-[166px] flex items-center justify-between px-10">

        <div className="flex gap-8">
          <NavButton title="소식" subtitle="NEWS" to="/news" />
          <NavButton title="게임정보" subtitle="GAME INFO" to="/" />
        </div>
        <div className="w-[212px] h-[127px] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <Link to="/">
            <img src={logoImg} alt="도타이쿤 로고" className="w-full h-full object-contain drop-shadow-[0px_4px_4px_rgba(0,0,0,0.5)]" />
          </Link>
        </div>
        <div className="flex gap-8">
          <NavButton title="커뮤니티" subtitle="COMMUNITY" to="/community" />
          <NavButton title="다운로드" subtitle="DOWNLOAD" to="/" />
        </div>

      </div>
    </header>
  );
}