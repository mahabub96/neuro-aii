/* ============================================
   RESULT CARD COMPONENT — NeuroSense AI
   Displays AI analysis results
   ============================================ */

import React from 'react';
import './ResultCard.css';

const ResultCard = ({ type, prediction, confidence, tumorType, onReset }) => {
  const isPositive = prediction === 'Pneumonia' || prediction === 'Tumor Detected';
  const statusClass = isPositive ? 'result-card--danger' : 'result-card--safe';
  const barColor = isPositive ? 'var(--color-alert-red)' : 'var(--color-safe-green)';

  return (
    <div className={`result-card ${statusClass}`}>
      {/* Status icon */}
      <div className="result-card__icon">
        {isPositive ? '⚠️' : '✅'}
      </div>

      {/* Result text */}
      <h3 className="result-card__title">
        {type === 'pneumonia'
          ? (isPositive ? 'Pneumonia Detected' : 'Normal — No Pneumonia Detected')
          : (isPositive ? 'Tumor Detected' : 'No Tumor Detected')
        }
      </h3>

      {/* Tumor type if available */}
      {tumorType && (
        <p className="result-card__tumor-type">
          Type: <strong>{tumorType}</strong>
        </p>
      )}

      {/* Confidence bar */}
      <div className="result-card__confidence">
        <div className="result-card__confidence-header">
          <span>Confidence</span>
          <span className="result-card__confidence-value">{confidence}%</span>
        </div>
        <div className="result-card__bar">
          <div
            className="result-card__bar-fill"
            style={{ width: `${confidence}%`, background: barColor }}
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="result-card__disclaimer">
        <span>⚠️</span>
        <p>This is an AI prediction tool. Please consult a qualified medical professional for diagnosis.</p>
      </div>

      {/* Reset button */}
      <button className="result-card__reset" onClick={onReset}>
        Analyze Another Image
      </button>
    </div>
  );
};

export default ResultCard;
