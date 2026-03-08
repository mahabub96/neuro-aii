import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import PneumoniaDetection from './pages/Pneumonia/PneumoniaDetection.jsx';
import BrainTumorDetection from './pages/BrainTumor/BrainTumorDetection.jsx';
import DrowsinessDetection from './pages/Drowsiness/DrowsinessDetection.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pneumonia" element={<PneumoniaDetection />} />
        <Route path="/brain-tumor" element={<BrainTumorDetection />} />
        <Route path="/drowsiness" element={<DrowsinessDetection />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
