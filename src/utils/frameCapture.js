/* ============================================
   FRAME CAPTURE UTILITY — NeuroSense AI
   Captures video frames as base64 for AI analysis
   ============================================ */

/**
 * Capture a single frame from a video element
 * @param {HTMLVideoElement} videoElement - The video element to capture from
 * @param {number} width - Output width (default 320)
 * @param {number} height - Output height (default 240)
 * @returns {string|null} - Base64-encoded JPEG string, or null if failed
 */
export const captureFrame = (videoElement, width = 320, height = 240) => {
  if (!videoElement || videoElement.readyState < 2) {
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoElement, 0, 0, width, height);

  /* Convert to base64 JPEG with reduced quality for faster transfer */
  const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

  /* Strip the data URL prefix to get raw base64 */
  return dataUrl.split(',')[1];
};
