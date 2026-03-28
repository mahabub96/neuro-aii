import { postForm, postJson } from './client.js';

export const analyzePneumonia = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  return postForm('/api/pneumonia', formData);
};

export const analyzeBrainTumor = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  return postForm('/api/brain-tumor', formData);
};

export const predictDrowsiness = async (base64Frame) => {
  return postJson('/api/drowsiness/predict', { frame: base64Frame });
};
