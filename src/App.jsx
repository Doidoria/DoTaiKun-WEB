import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import News from './components/News';
import Community from './components/Community';
import RouletteEvent from './components/RouletteEvent';
import ContestVote from './components/ContestVote';
import ContestAdmin from './components/ContestAdmin';
import AnnounceAdmin from './components/AnnounceAdmin';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative w-full min-h-screen bg-[#1E1E1E] overflow-x-hidden flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/community" element={<Community />} />
          <Route path="/roulett-Event" element={<RouletteEvent />} />
          <Route path="/contest" element={<ContestVote />} />
          <Route path="/admin-vote" element={<ContestAdmin />} />
          <Route path="/admin-announce" element={<AnnounceAdmin />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App