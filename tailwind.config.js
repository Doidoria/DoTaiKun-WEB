/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#1E1E1E',
        'game-point': '#4A90E2',
      },
      screens: {
        'fhd': '1920px', 
      },
      // ⭐ 여기에 나만의 애니메이션을 추가합니다!
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }, // 위로 20px 둥둥 떴다가 내려옴
        }
      },
      animation: {
        'float-slow': 'float 3s ease-in-out infinite', // 3초 동안 부드럽게 무한 반복
      }
    },
  },
  plugins: [],
}