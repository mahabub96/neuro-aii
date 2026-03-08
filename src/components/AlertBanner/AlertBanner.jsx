/* ============================================
   ALERT BANNER COMPONENT — NeuroSense AI
   Full-screen danger alerts and warning banners
   ============================================ */

import React from 'react';
import './AlertBanner.css';

const AlertBanner = ({ type, message }) => {
  if (!type || type === 'safe' || type === 'idle') return null;

  const isDanger = type === 'danger';

  return (
    <>
      {/* Full screen red flash for danger */}
      {isDanger && <div className="alert-flash" />}

      {/* Banner */}
      <div className={`alert-banner alert-banner--${type}`}>
        <span className="alert-banner__icon">{isDanger ? '⚠️' : '🥱'}</span>
        <span className="alert-banner__text">{message}</span>
      </div>
    </>
  );
};

export default AlertBanner;
