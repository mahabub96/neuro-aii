/* ============================================
   useSessionStats Hook — NeuroSense AI
   Tracks drowsiness monitoring session stats
   ============================================ */

import { useState, useRef, useCallback } from 'react';

const useSessionStats = () => {
  const [stats, setStats] = useState({
    duration: 0,
    totalAlerts: 0,
    eyesClosedEvents: 0,
    yawnEvents: 0,
    isMonitoring: false,
  });

  const timerRef = useRef(null);

  /** Start the session timer */
  const startSession = useCallback(() => {
    setStats((prev) => ({ ...prev, isMonitoring: true, duration: 0 }));
    timerRef.current = setInterval(() => {
      setStats((prev) => ({ ...prev, duration: prev.duration + 1 }));
    }, 1000);
  }, []);

  /** Stop the session timer */
  const stopSession = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStats((prev) => ({ ...prev, isMonitoring: false }));
  }, []);

  /** Reset all stats */
  const resetSession = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStats({
      duration: 0,
      totalAlerts: 0,
      eyesClosedEvents: 0,
      yawnEvents: 0,
      isMonitoring: false,
    });
  }, []);

  /** Record an event */
  const recordEvent = useCallback((type) => {
    setStats((prev) => {
      const updated = { ...prev };
      if (type === 'eyes_closed') {
        updated.eyesClosedEvents += 1;
        updated.totalAlerts += 1;
      } else if (type === 'yawn') {
        updated.yawnEvents += 1;
        updated.totalAlerts += 1;
      }
      return updated;
    });
  }, []);

  /** Format seconds to HH:MM:SS */
  const formatDuration = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return {
    stats,
    startSession,
    stopSession,
    resetSession,
    recordEvent,
    formatDuration,
  };
};

export default useSessionStats;
