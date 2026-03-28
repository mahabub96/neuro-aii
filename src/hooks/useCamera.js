/* ============================================
   useCamera Hook — NeuroSense AI
   Manages webcam access and video stream
   ============================================ */

import { useState, useRef, useCallback, useEffect } from 'react';

const useCamera = () => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const attachStreamToVideo = useCallback(async () => {
    if (!videoRef.current || !streamRef.current) return false;

    if (videoRef.current.srcObject !== streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }

    try {
      await videoRef.current.play();
    } catch {
      // Browser can reject play briefly; effect retries until video is ready.
    }

    return true;
  }, []);

  useEffect(() => {
    if (!isActive) return;

    let cancelled = false;

    const ensureAttached = async () => {
      for (let attempt = 0; attempt < 20 && !cancelled; attempt += 1) {
        const attached = await attachStreamToVideo();
        if (attached && videoRef.current?.readyState >= 2) {
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    ensureAttached();

    return () => {
      cancelled = true;
    };
  }, [isActive, attachStreamToVideo]);

  /** Start the webcam stream */
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
        audio: false,
      });
      streamRef.current = stream;
      setIsActive(true);

      // Best effort immediate attach if video element is already mounted.
      await attachStreamToVideo();

      return true;
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
      setIsActive(false);
      return false;
    }
  }, [attachStreamToVideo]);

  /** Stop the webcam stream */
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);

  return { videoRef, isActive, error, startCamera, stopCamera };
};

export default useCamera;
