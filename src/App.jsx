import { useState } from 'react'
import Header from './components/Header';
import Hero from './components/Hero';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative w-full min-h-screen">
      <Header />
      <Hero/>
      <Content/>
      <Footer/>
    </div>
  )
}

export default App