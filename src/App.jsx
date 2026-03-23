import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import News from './components/News';
import Community from './components/Community';
import RouletteEvent from './components/RouletteEvent';

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
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App