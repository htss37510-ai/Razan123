import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Disable double-tap to zoom on iOS devices
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

// Disable pinch-to-zoom gesture on iOS devices
document.addEventListener('touchstart', (event) => {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

// Disable iOS Safari gesture scaling
document.addEventListener('gesturestart', (event) => {
  event.preventDefault();
});

// Disable desktop/trackpad pinch-to-zoom (emulated as wheel + Ctrl)
document.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
}, { passive: false });

// Disable browser shortcut zooms (Ctrl + '+' / '-' / '0')
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && (event.key === '=' || event.key === '-' || event.key === '+' || event.key === '0')) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
