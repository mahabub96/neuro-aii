/* ============================================
   PNEUMONIA DETECTION PAGE — NeuroSense AI
   ============================================ */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../../components/ImageUploader/ImageUploader.jsx';
import ResultCard from '../../components/ResultCard/ResultCard.jsx';
import ResearchReference from '../../components/ResearchReference/ResearchReference.jsx';
import { analyzePneumonia } from '../../services/api/index.js';
import './PneumoniaDetection.css';

const PneumoniaDetection = () => {
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
      const data = await analyzePneumonia(file);
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
    <div className="pneumonia-page">
      <div className="pneumonia-page__container">
        {/* Back button */}
        <button className="pneumonia-page__back" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        {/* Header */}
        <div className="pneumonia-page__header">
          <h1 className="pneumonia-page__title">🫁 Pneumonia Detection</h1>
          <p className="pneumonia-page__subtitle">Upload a chest X-ray image for AI analysis</p>
        </div>

        {/* Upload area */}
        {!result && (
          <>
            <ImageUploader
              icon="🫁"
              label="Drag & Drop your X-ray here"
              sublabel="or click to browse files • Supports JPG, PNG"
              accentColor="#2196F3"
              onFileSelect={setFile}
            />

            {/* Analyze button */}
            {file && (
              <button
                className="pneumonia-page__analyze"
                onClick={handleAnalyze}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  'Analyze X-Ray'
                )}
              </button>
            )}
          </>
        )}

        {/* Error */}
        {error && (
          <div className="pneumonia-page__error">
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <ResultCard
            type="pneumonia"
            prediction={result.prediction}
            confidence={result.confidence}
            onReset={handleReset}
          />
        )}

        <ResearchReference model="pneumonia" />
      </div>
    </div>
  );
};

export default PneumoniaDetection;
