/* ============================================
   LIVE CAMERA COMPONENT — NeuroSense AI
   Webcam feed with detection overlay
   ============================================ */

import React from 'react';
import './LiveCamera.css';

const predictionStyles = {
  'Open Eyes': { emoji: '👁️', color: 'var(--color-safe-green)', text: 'Eyes Open' },
  'open_eyes': { emoji: '👁️', color: 'var(--color-safe-green)', text: 'Eyes Open' },
  'Closed Eyes': { emoji: '😴', color: 'var(--color-alert-red)', text: 'Eyes Closed' },
  'closed_eyes': { emoji: '😴', color: 'var(--color-alert-red)', text: 'Eyes Closed' },
  'Yawn': { emoji: '🥱', color: 'var(--color-warning-orange)', text: 'Yawning' },
  'yawn': { emoji: '🥱', color: 'var(--color-warning-orange)', text: 'Yawning' },
  'Normal': { emoji: '✅', color: 'var(--color-safe-green)', text: 'Normal' },
};

const LiveCamera = ({ videoRef, isActive, prediction }) => {
  const style = prediction ? (predictionStyles[prediction] || predictionStyles['Normal']) : null;

  return (
    <div className="live-camera">
      {isActive ? (
        <div className="live-camera__container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="live-camera__video"
          />

          {/* Detection overlay label */}
          {style && (
            <div className="live-camera__overlay" style={{ '--overlay-color': style.color }}>
              <span className="live-camera__overlay-emoji">{style.emoji}</span>
              <span className="live-camera__overlay-text">{style.text}</span>
            </div>
          )}

          {/* Corner brackets for HUD feel */}
          <div className="live-camera__bracket live-camera__bracket--tl" />
          <div className="live-camera__bracket live-camera__bracket--tr" />
          <div className="live-camera__bracket live-camera__bracket--bl" />
          <div className="live-camera__bracket live-camera__bracket--br" />
        </div>
      ) : (
        <div className="live-camera__placeholder">
          <span className="live-camera__placeholder-icon">📷</span>
          <p>Camera feed will appear here</p>
        </div>
      )}
    </div>
  );
};

export default LiveCamera;
