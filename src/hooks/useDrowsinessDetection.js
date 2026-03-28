/* ============================================
   useDrowsinessDetection Hook — NeuroSense AI
   Real-time drowsiness detection loop
   ============================================ */

import { useState, useRef, useCallback } from 'react';
import { predictDrowsiness } from '../services/api/index.js';
import { captureFrame } from '../utils/frameCapture.js';
import { playAlarm, triggerVibration } from '../utils/audioAlert.js';

const useDrowsinessDetection = (videoRef, recordEvent) => {
  const [prediction, setPrediction] = useState(null);
  const [status, setStatus] = useState('idle'); /* idle | safe | warning | danger */
  const [isRunning, setIsRunning] = useState(false);
  const [apiError, setApiError] = useState(null);
  const intervalRef = useRef(null);
  const closedCountRef = useRef(0);
  const isProcessingRef = useRef(false);

  /** Start the detection loop — captures frames every 300ms */
  const startDetection = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsRunning(true);
    setStatus('safe');
    setApiError(null);
    closedCountRef.current = 0;
    isProcessingRef.current = false;

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || isProcessingRef.current) return;

      const frame = captureFrame(videoRef.current, 480, 360, 0.85);
      if (!frame) return;

      isProcessingRef.current = true;

      try {
        const result = await predictDrowsiness(frame);
        setApiError(null);

        const label = result.prediction || 'Normal';
        setPrediction(label);

        const normalizedLabel = label.toLowerCase();

        if (normalizedLabel === 'no face detected' || normalizedLabel === 'no_face') {
          closedCountRef.current = 0;
          setStatus('warning');
        } else if (label === 'Closed Eyes' || label === 'closed_eyes') {
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
      } catch (error) {
        setApiError(error?.message || 'Realtime detection error');
        setStatus('warning');
      } finally {
        isProcessingRef.current = false;
      }
    }, 300);
  }, [videoRef, recordEvent]);

  /** Stop the detection loop */
  const stopDetection = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setStatus('idle');
    setApiError(null);
    setPrediction(null);
    closedCountRef.current = 0;
    isProcessingRef.current = false;
  }, []);

  return { prediction, status, isRunning, apiError, startDetection, stopDetection };
};

export default useDrowsinessDetection;
