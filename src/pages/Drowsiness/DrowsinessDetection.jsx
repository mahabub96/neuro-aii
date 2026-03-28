/* ============================================
   DROWSINESS DETECTION PAGE — NeuroSense AI
   Real-time driver monitoring dashboard
   ============================================ */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LiveCamera from '../../components/LiveCamera/LiveCamera.jsx';
import StatusBar from '../../components/StatusBar/StatusBar.jsx';
import AlertBanner from '../../components/AlertBanner/AlertBanner.jsx';
import ResearchReference from '../../components/ResearchReference/ResearchReference.jsx';
import useCamera from '../../hooks/useCamera.js';
import useDrowsinessDetection from '../../hooks/useDrowsinessDetection.js';
import useSessionStats from '../../hooks/useSessionStats.js';
import './DrowsinessDetection.css';

const DrowsinessDetection = () => {
  const navigate = useNavigate();
  const { videoRef, isActive, error: camError, startCamera, stopCamera } = useCamera();
  const { stats, startSession, stopSession, resetSession, recordEvent, formatDuration } = useSessionStats();
  const { prediction, status, isRunning, apiError, startDetection, stopDetection } = useDrowsinessDetection(videoRef, recordEvent);

  const handleStart = async () => {
    const cameraStarted = await startCamera();
    if (!cameraStarted) return;

    startSession();
    startDetection();
  };

  const handleStop = () => {
    stopDetection();
    stopCamera();
    stopSession();
  };

  const handleReset = () => {
    handleStop();
    resetSession();
  };

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      stopDetection();
      stopCamera();
      stopSession();
    };
  }, []);

  const alertMessage = status === 'danger'
    ? '⚠️ WAKE UP! PULL OVER!'
    : status === 'warning'
    ? '🥱 Yawning detected — Stay Alert!'
    : '';

  return (
    <div className="drowsy-page">
      {/* Alert overlays */}
      <AlertBanner type={status} message={alertMessage} />

      <div className="drowsy-page__container">
        {/* Back button */}
        <button className="drowsy-page__back" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        {/* Header */}
        <div className="drowsy-page__header">
          <h1 className="drowsy-page__title">
            Driver Drowsiness Monitor
            <span className="drowsy-page__live-badge">
              <span className="drowsy-page__live-dot" />
              LIVE
            </span>
          </h1>
        </div>

        {/* Status bar */}
        <StatusBar status={status} />

        {/* Camera feed */}
        <div className="drowsy-page__camera">
          <LiveCamera videoRef={videoRef} isActive={isActive} prediction={prediction} />

          {(camError || apiError) && (
            <div className="drowsy-page__cam-error">
              <span>📷</span>
              <p>{camError || apiError}</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="drowsy-page__controls">
          {!isRunning ? (
            <button className="drowsy-page__btn drowsy-page__btn--start" onClick={handleStart}>
              ▶ Start Monitoring
            </button>
          ) : (
            <button className="drowsy-page__btn drowsy-page__btn--stop" onClick={handleStop}>
              ⏹ Stop Monitoring
            </button>
          )}
          <button className="drowsy-page__btn drowsy-page__btn--reset" onClick={handleReset}>
            ↺ Reset Session
          </button>
        </div>

        {/* Session Stats */}
        <div className="drowsy-page__stats">
          <h3 className="drowsy-page__stats-title">Session Stats</h3>
          <div className="drowsy-page__stats-grid">
            <div className="drowsy-page__stat">
              <span className="drowsy-page__stat-value">{formatDuration(stats.duration)}</span>
              <span className="drowsy-page__stat-label">Duration</span>
            </div>
            <div className="drowsy-page__stat">
              <span className="drowsy-page__stat-value">{stats.totalAlerts}</span>
              <span className="drowsy-page__stat-label">Total Alerts</span>
            </div>
            <div className="drowsy-page__stat">
              <span className="drowsy-page__stat-value">{stats.eyesClosedEvents}</span>
              <span className="drowsy-page__stat-label">Eyes Closed</span>
            </div>
            <div className="drowsy-page__stat">
              <span className="drowsy-page__stat-value">{stats.yawnEvents}</span>
              <span className="drowsy-page__stat-label">Yawn Events</span>
            </div>
          </div>
          <div className="drowsy-page__stat-status">
            Status: <strong>{stats.isMonitoring ? '🟢 Monitoring' : '⏸️ Stopped'}</strong>
          </div>
        </div>

        <ResearchReference model="drowsiness" />
      </div>
    </div>
  );
};

export default DrowsinessDetection;
