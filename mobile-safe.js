// Global mobile safety: prevent zoom, double-tap, and unwanted gestures
document.addEventListener('touchstart', e => {
  if (e.target.closest('button, a, canvas')) {
    e.preventDefault();
  }
}, { passive: false });
