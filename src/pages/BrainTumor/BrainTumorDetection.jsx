/* ============================================
   BRAIN TUMOR DETECTION PAGE — NeuroSense AI
   ============================================ */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../../components/ImageUploader/ImageUploader.jsx';
import ResultCard from '../../components/ResultCard/ResultCard.jsx';
import ResearchReference from '../../components/ResearchReference/ResearchReference.jsx';
import { analyzeBrainTumor } from '../../services/api/index.js';
import './BrainTumorDetection.css';

const BrainTumorDetection = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeBrainTumor(file);
      setResult(data);
    } catch (err) {
      setError('Unable to connect to the AI server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="brain-page">
      <div className="brain-page__container">
        {/* Back button */}
        <button className="brain-page__back" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        {/* Header */}
        <div className="brain-page__header">
          <h1 className="brain-page__title">🧠 Brain Tumor Detection</h1>
          <p className="brain-page__subtitle">Upload a brain MRI scan for deep learning analysis</p>
        </div>

        {/* Upload */}
        {!result && (
          <>
            <ImageUploader
              icon="🧠"
              label="Upload Brain MRI Scan"
              sublabel="Supports JPG, PNG formats"
              accentColor="#9C27B0"
              onFileSelect={setFile}
            />

            {file && (
              <button
                className="brain-page__analyze"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    <span>Scanning MRI...</span>
                  </>
                ) : (
                  'Detect Tumor'
                )}
              </button>
            )}
          </>
        )}

        {/* Error */}
        {error && (
          <div className="brain-page__error">
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <ResultCard
            type="brain"
            prediction={result.prediction}
            confidence={result.confidence}
            tumorType={result.tumor_type}
            onReset={handleReset}
          />
        )}

        <ResearchReference model="brain" />
      </div>
    </div>
  );
};

export default BrainTumorDetection;
