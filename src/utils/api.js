/* ============================================
   API UTILITY — NeuroSense AI
   Handles all backend communication
   ============================================ */

const BASE_URL = 'http://localhost:8000';

/**
 * Analyze a chest X-ray for pneumonia detection
 * @param {File} imageFile - The X-ray image file
 * @returns {Promise<Object>} - { prediction, confidence }
 */
export const analyzePneumonia = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(`${BASE_URL}/api/pneumonia`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return await response.json();
};

/**
 * Analyze a brain MRI for tumor detection
 * @param {File} imageFile - The MRI image file
 * @returns {Promise<Object>} - { prediction, tumor_type, confidence }
 */
export const analyzeBrainTumor = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(`${BASE_URL}/api/brain-tumor`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return await response.json();
};

/**
 * Send a video frame for drowsiness prediction
 * @param {string} base64Frame - Base64-encoded frame from webcam
 * @returns {Promise<Object>} - { prediction }
 */
export const predictDrowsiness = async (base64Frame) => {
  const response = await fetch(`${BASE_URL}/api/drowsiness/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ frame: base64Frame }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return await response.json();
};
