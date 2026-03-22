/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind가 스타일을 적용할 파일들의 경로를 지정합니다.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 피그마에서 추출한 색상을 커스텀으로 등록합니다.
      colors: {
        'game-bg': '#1E1E1E',   // 기본 다크모드 배경색
        'game-point': '#4A90E2', // 버튼 등에 쓸 포인트 블루 색상
      },
      // 1920px 해상도에 맞춘 기준점을 추가합니다.
      screens: {
        'fhd': '1920px', 
      }
    },
  },
  plugins: [],
}