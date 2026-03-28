/* ============================================
   MODEL CARD COMPONENT — NeuroSense AI
   Reusable card for AI model display
   ============================================ */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModelCard.css';

const ModelCard = ({ icon, title, description, tag, tagLive, researchBadge, accentColor, buttonText, path }) => {
  const navigate = useNavigate();

  return (
    <div
      className="model-card"
      style={{ '--accent': accentColor, '--accent-glow': `${accentColor}40` }}
    >
      {/* Glow backdrop */}
      <div className="model-card__glow" />

      {/* Tag */}
      <div className="model-card__tag">
        {tag}
        {tagLive && <span className="model-card__live-dot" />}
      </div>

      {researchBadge && <div className="model-card__research-badge">{researchBadge}</div>}

      {/* Icon */}
      <div className="model-card__icon">{icon}</div>

      {/* Content */}
      <h3 className="model-card__title">{title}</h3>
      <p className="model-card__desc">{description}</p>

      {/* Button */}
      <button
        className="model-card__btn"
        onClick={() => navigate(path)}
      >
        {buttonText}
        <span className="model-card__btn-arrow">→</span>
      </button>
    </div>
  );
};

export default ModelCard;
