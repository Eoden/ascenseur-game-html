// Mobile safety without breaking navigation
// Prevent double-tap zoom and unwanted gestures, but allow links to work

document.addEventListener('touchstart', e => {
  // Allow normal behavior for links
  if (e.target.closest('a')) return;

  if (e.target.closest('button, canvas')) {
    e.preventDefault();
  }
}, { passive: false });
