/* ============================================
   AUDIO ALERT UTILITY — NeuroSense AI
   Handles alarm sounds for drowsiness alerts
   ============================================ */

let audioContext = null;
let isPlaying = false;

/**
 * Initialize the Web Audio API context
 */
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

/**
 * Play a beeping alarm sound
 * @param {number} duration - Duration in milliseconds
 */
export const playAlarm = (duration = 2000) => {
  if (isPlaying) return;
  isPlaying = true;

  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  /* Alarm frequency pattern */
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(800, ctx.currentTime);
  oscillator.frequency.setValueAtTime(600, ctx.currentTime + 0.2);
  oscillator.frequency.setValueAtTime(800, ctx.currentTime + 0.4);

  /* Volume envelope */
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration / 1000);

  oscillator.onended = () => {
    isPlaying = false;
  };
};

/**
 * Play a subtle click/beep sound for UI interactions
 */
export const playBeep = () => {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
  gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
};

/**
 * Trigger device vibration if supported
 * @param {number[]} pattern - Vibration pattern
 */
export const triggerVibration = (pattern = [200, 100, 200]) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};
