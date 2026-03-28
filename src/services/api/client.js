import { API_BASE_URL } from '../../config/env.js';

const buildUrl = (path) => `${API_BASE_URL}${path}`;

const parseErrorMessage = async (response) => {
  try {
    const payload = await response.json();
    if (typeof payload?.detail === 'string') {
      return payload.detail;
    }
    if (typeof payload?.message === 'string') {
      return payload.message;
    }
  } catch {
    // Ignore JSON parsing errors and use fallback message.
  }
  return `Request failed with status ${response.status}`;
};

export const postForm = async (path, formData) => {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};

export const postJson = async (path, payload) => {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};
