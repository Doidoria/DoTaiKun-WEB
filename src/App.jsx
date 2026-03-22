import { useState } from 'react'
import Header from './components/Header';
import Hero from './components/Hero';
import Content from './components/Content';
import Footer from './components/Footer';
import News from './components/News';
import Community from './components/Community';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-[#1E1E1E] overflow-x-hidden">
      <Header />
      {/* <Hero/> */}
      {/* <Content/> */}
      {/* <News /> */}
      <Community />
      <Footer/>
    </div>
  )
}

export default App