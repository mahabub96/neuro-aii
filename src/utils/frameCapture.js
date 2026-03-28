/* ============================================
   FRAME CAPTURE UTILITY — NeuroSense AI
   Captures video frames as base64 for AI analysis
   ============================================ */

/**
 * Capture a single frame from a video element
 * @param {HTMLVideoElement} videoElement - The video element to capture from
 * @param {number} width - Optional output width
 * @param {number} height - Optional output height
 * @param {number} quality - JPEG quality from 0 to 1 (default 0.85)
 * @returns {string|null} - Base64-encoded JPEG string, or null if failed
 */
export const captureFrame = (videoElement, width, height, quality = 0.85) => {
  if (!videoElement || videoElement.readyState < 2) {
    return null;
  }

  const nativeWidth = videoElement.videoWidth || 640;
  const nativeHeight = videoElement.videoHeight || 480;
  const outputWidth = width || Math.min(nativeWidth, 640);
  const outputHeight = height || Math.min(nativeHeight, 480);

  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoElement, 0, 0, outputWidth, outputHeight);

  /* Use balanced quality for face landmark reliability in low light. */
  const dataUrl = canvas.toDataURL('image/jpeg', quality);

  /* Strip the data URL prefix to get raw base64 */
  return dataUrl.split(',')[1];
};
