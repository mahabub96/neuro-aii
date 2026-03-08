/* ============================================
   useDrowsinessDetection Hook — NeuroSense AI
   Real-time drowsiness detection loop
   ============================================ */

import { useState, useRef, useCallback } from 'react';
import { predictDrowsiness } from '../utils/api.js';
import { captureFrame } from '../utils/frameCapture.js';
import { playAlarm, triggerVibration } from '../utils/audioAlert.js';

const useDrowsinessDetection = (videoRef, recordEvent) => {
  const [prediction, setPrediction] = useState(null);
  const [status, setStatus] = useState('idle'); /* idle | safe | warning | danger */
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const closedCountRef = useRef(0);

  /** Start the detection loop — captures frames every 300ms */
  const startDetection = useCallback(() => {
    setIsRunning(true);
    setStatus('safe');
    closedCountRef.current = 0;

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current) return;

      const frame = captureFrame(videoRef.current);
      if (!frame) return;

      try {
        const result = await predictDrowsiness(frame);
        const label = result.prediction || 'Normal';
        setPrediction(label);

        if (label === 'Closed Eyes' || label === 'closed_eyes') {
          closedCountRef.current += 1;
          recordEvent('eyes_closed');

          if (closedCountRef.current >= 2) {
            setStatus('danger');
            playAlarm(2000);
            triggerVibration();
          }
        } else if (label === 'Yawn' || label === 'yawn') {
          closedCountRef.current = 0;
          setStatus('warning');
          recordEvent('yawn');
        } else {
          closedCountRef.current = 0;
          setStatus('safe');
        }
      } catch {
        /* Silently handle API errors to keep loop running */
      }
    }, 300);
  }, [videoRef, recordEvent]);

  /** Stop the detection loop */
  const stopDetection = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setStatus('idle');
    setPrediction(null);
    closedCountRef.current = 0;
  }, []);

  return { prediction, status, isRunning, startDetection, stopDetection };
};

export default useDrowsinessDetection;
