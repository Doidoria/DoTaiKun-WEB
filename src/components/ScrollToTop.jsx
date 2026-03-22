import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation(); // 현재 브라우저의 주소를 가져옴.

  // 주소(pathname)가 바뀔 때마다 안의 코드를 실행
  useEffect(() => {
    window.scrollTo(0, 0); // 화면 스크롤을 x: 0, y: 0 (맨 위)로 이동
  }, [pathname]);

  return null; // 화면에 보여줄 UI는 없으므로 null을 반환
}