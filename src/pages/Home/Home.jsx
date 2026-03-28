/* ============================================
   HOME PAGE — NeuroSense AI
   Hero, Models, How It Works, Stats, Footer
   ============================================ */

import React, { useState, useEffect, useRef } from 'react';
import ModelCard from '../../components/ModelCard/ModelCard.jsx';
import './Home.css';

/* Animated counter hook */
const useCountUp = (target, duration = 2000, startCounting) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
};

const Home = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  /* Intersection observer for stats count-up */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const modelCount = useCountUp(3, 1500, statsVisible);
  const accuracyCount = useCountUp(99, 2000, statsVisible);

  return (
    <div className="home">
      {/* ========== HERO ========== */}
      <section className="hero">
        {/* Animated background orbs */}
        <div className="hero__orbs">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>

        {/* Grid overlay */}
        <div className="hero__grid" />

        <div className="hero__content">
          <h1 className="hero__title">NeuroSense AI</h1>
          <p className="hero__subtitle">Intelligent Detection. Real-Time Precision.</p>
          <p className="hero__tagline">
            AI-Powered Medical Imaging &amp; Real-Time Drowsiness Detection Platform
          </p>
          <div className="hero__cta">
            <a href="#models" className="hero__btn hero__btn--primary">Explore Models</a>
            <a href="#how-it-works" className="hero__btn hero__btn--secondary">How It Works</a>
          </div>
        </div>

        {/* Scan line animation */}
        <div className="hero__scanline" />
      </section>

      {/* ========== MODELS ========== */}
      <section className="models" id="models">
        <div className="container">
          <h2 className="section-title">Choose Your AI Model</h2>
          <p className="section-subtitle">Select an AI-powered tool to get started with instant analysis</p>

          <div className="models__grid">
            <ModelCard
              icon="🫁"
              title="Pneumonia Detection"
              description="Upload a chest X-ray and get instant AI-powered diagnosis with confidence score"
              tag="Medical Imaging"
              researchBadge="🔄 Paper Under Review"
              accentColor="#2196F3"
              buttonText="Launch Model"
              path="/pneumonia"
            />
            <ModelCard
              icon="🧠"
              title="Brain Tumor Detection"
              description="Analyze MRI brain scans to detect tumors with deep learning precision"
              tag="Medical Imaging"
              researchBadge="✅ IEEE ICECTE 2026 Published"
              accentColor="#9C27B0"
              buttonText="Launch Model"
              path="/brain-tumor"
            />
            <ModelCard
              icon="👁️"
              title="Drowsiness Detection"
              description="Real-time driver monitoring via webcam. Get instant alerts when drowsiness is detected"
              tag="Live Detection"
              tagLive
              researchBadge="🔄 Paper Under Review"
              accentColor="#F44336"
              buttonText="Launch Live"
              path="/drowsiness"
            />
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Three simple steps to get AI-powered results</p>

          <div className="steps">
            <div className="step">
              <div className="step__number">01</div>
              <div className="step__icon">🎯</div>
              <h3 className="step__title">Choose Model</h3>
              <p className="step__desc">Select the AI model that fits your needs — medical imaging or live detection</p>
            </div>
            <div className="step__connector" />
            <div className="step">
              <div className="step__number">02</div>
              <div className="step__icon">📤</div>
              <h3 className="step__title">Upload or Allow Camera</h3>
              <p className="step__desc">Upload a medical scan image or grant camera access for real-time monitoring</p>
            </div>
            <div className="step__connector" />
            <div className="step">
              <div className="step__number">03</div>
              <div className="step__icon">⚡</div>
              <h3 className="step__title">Get Instant Results</h3>
              <p className="step__desc">Receive AI-powered analysis with confidence scores in seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="stats" ref={statsRef}>
        <div className="container">
          <div className="stats__grid">
            <div className="stats__item">
              <span className="stats__value">{modelCount}</span>
              <span className="stats__label">AI Models</span>
            </div>
            <div className="stats__item">
              <span className="stats__value">{accuracyCount}%+</span>
              <span className="stats__label">Accuracy</span>
            </div>
            <div className="stats__item">
              <span className="stats__value">⚡</span>
              <span className="stats__label">Real-Time Detection</span>
            </div>
            <div className="stats__item">
              <span className="stats__value">🌐</span>
              <span className="stats__label">100% Browser-Based</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <span className="footer__logo">◆ NeuroSense AI</span>
              <p className="footer__tagline">Intelligent Detection. Real-Time Precision.</p>
            </div>
            <p className="footer__built">
              Built by{' '}
              <a
                className="footer__link"
                href="https://example.com/portfolio"
                target="_blank"
                rel="noreferrer"
              >
                Mahabub Alam
              </a>
            </p>
            <p className="footer__disclaimer">
              ⚠️ Important Disclaimer: This platform features AI models developed based on peer-reviewed and under-review research. The brain tumour detection model is published in IEEE Xplore, while the pneumonia detection and drowsiness detection models have papers currently under peer review. All models are trained on validated datasets, however, AI models can make errors regardless of accuracy levels. This platform is intended for educational and research purposes only and is not a substitute for professional medical diagnosis. Always consult a qualified healthcare professional for medical decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
