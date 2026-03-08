/* ============================================
   STATUS BAR COMPONENT — NeuroSense AI
   Drowsiness detection status display
   ============================================ */

import React from 'react';
import './StatusBar.css';

const statusConfig = {
  idle: { text: 'System Idle — Start Monitoring', color: 'var(--color-text-secondary)', bg: 'rgba(255,255,255,0.05)', icon: '⏸️' },
  safe: { text: 'ALERT — You\'re Good to Drive', color: 'var(--color-safe-green)', bg: 'rgba(76, 175, 80, 0.1)', icon: '🟢' },
  warning: { text: 'WARNING — Stay Focused', color: 'var(--color-warning-orange)', bg: 'rgba(255, 152, 0, 0.1)', icon: '🟡' },
  danger: { text: 'DANGER — Pull Over Now!', color: 'var(--color-alert-red)', bg: 'rgba(244, 67, 54, 0.15)', icon: '🔴' },
};

const StatusBar = ({ status }) => {
  const config = statusConfig[status] || statusConfig.idle;

  return (
    <div className="status-bar" style={{ '--status-color': config.color, '--status-bg': config.bg }}>
      <span className="status-bar__icon">{config.icon}</span>
      <span className="status-bar__text">{config.text}</span>
    </div>
  );
};

export default StatusBar;
