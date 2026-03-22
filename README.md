# DoTaiKun WEB (도타이쿤 공식 웹사이트)

야생 경제와 RPG가 공존하는 마인크래프트 서버, '도타이쿤(DoTaiKun)'을 위한 공식 웹사이트 프론트엔드 프로젝트입니다.
유저들에게 최신 서버 소식을 전달하고, 창작물과 공략을 공유할 수 있는 커뮤니티 기능을 제공합니다.

**Live Demo:** [https://do-tai-kun-web.vercel.app](https://do-tai-kun-web.vercel.app)

---

## Tech Stack (기술 스택)
<div align="left">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

---

## Key Features (주요 구현 기능)

### 1. 반응형 & 글래스모피즘 헤더 (Navigation)
* `react-router-dom`의 `useLocation`을 활용하여 현재 위치한 페이지의 **메뉴 활성화(Active) 상태 표시**
* 스크롤 이벤트 감지를 통한 **Shrinking Header (스크롤 시 헤더 및 로고 크기 축소)** 애니메이션 구현
* Backdrop-blur를 활용한 고급스러운 글래스모피즘(Glassmorphism) UI 적용
* 페이지 이동 시 스크롤을 최상단으로 초기화하는 `ScrollToTop` 커스텀 컴포넌트 적용

### 2. 메인 페이지 (Home)
* `setInterval`과 CSS `transform: translateX`를 활용한 **자동 슬라이딩 배너(Auto Slider)** 구현
* Hover 시 요소들이 부드럽게 떠오르는 인터랙티브 카드 레이아웃

### 3. 소식 게시판 (News)
* 카테고리(공지사항, 업데이트, 이벤트) 필터링 및 실시간 검색 기능 구현
* CSS `truncate`를 활용한 텍스트 줄임말(...) 처리 및 깔끔한 그리드 정렬
* **Load More (더 보기)** 버튼을 통한 클라이언트 사이드 데이터 페이징 처리

### 4. 커뮤니티 갤러리 (Community)
* **하이브리드 레이아웃:** `Flex stretch`와 `Absolute` 속성을 활용하여 갤러리 영역(M-Side)의 높이에 맞춰 실시간 피드 영역(R-Side)의 높이가 동기화되도록 구현
* **커스텀 스크롤바:** Tailwind 내에서 `<style>` 태그를 주입하여 피그마 디자인과 일치하는 커스텀 스크롤바(`dtk-scrollbar`) 적용
* **상세보기 모달(Modal):** 게시글 클릭 시 상세 내용을 보여주는 팝업 구현
* **Scroll Lock:** 모달이 열렸을 때 뒷배경의 스크롤을 방지하여 UX 개선 (`document.body.style.overflow` 제어)

---

## Future Updates (업데이트 예정)
* **모바일/태블릿 반응형 웹(Responsive Web) 지원** (v2.0 업데이트 예정)
* 다크 모드 / 라이트 모드 테마 적용

---

## Getting Started (로컬 실행 방법)

1. 저장소를 클론합니다.
```bash
git clone https://github.com/Doidoria/DoTaiKun-WEB.git
```

2. 패키지를 설치합니다.
```bash
npm install
```

3. 개발 서버를 실행합니다.
```bash
npm run dev
```

---
