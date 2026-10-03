/* ============================================
   FRAME CAPTURE UTILITY — NeuroSense AI
   Captures video frames as base64 for AI analysis
   ============================================ */

/**
 * Capture a single frame from a video element
 * @param {HTMLVideoElement} videoElement - The video element to capture from
 * @param {number} width - Optional maximum output width
 * @param {number} height - Optional maximum output height
 * @param {number} quality - JPEG quality from 0 to 1 (default 0.85)
 * @returns {string|null} - Base64-encoded JPEG string, or null if failed
 */
export const captureFrame = (videoElement, width, height, quality = 0.85) => {
  if (!videoElement || videoElement.readyState < 2) {
    return null;
  }

  const nativeWidth = videoElement.videoWidth;
  const nativeHeight = videoElement.videoHeight;
  if (!nativeWidth || !nativeHeight) return null;

  // Fit the full frame within the requested bounds without stretching or cropping.
  const scale = Math.min(
    (width || 640) / nativeWidth,
    (height || 480) / nativeHeight,
    1,
  );
  const outputWidth = Math.max(1, Math.round(nativeWidth * scale));
  const outputHeight = Math.max(1, Math.round(nativeHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const ctx = canvas.getContext('2d');
  // Mirror captured frames to match the visible camera preview.
  ctx.translate(outputWidth, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(videoElement, 0, 0, outputWidth, outputHeight);

  /* Use balanced quality for face landmark reliability in low light. */
  const dataUrl = canvas.toDataURL('image/jpeg', quality);

  /* Strip the data URL prefix to get raw base64 */
  return dataUrl.split(',')[1];
};
