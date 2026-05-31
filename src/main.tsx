// ─── Entry Point ─────────────────────────────────────────────────────────────
// This is the very first file that runs when the app starts.
// Its job is to find the <div id="root"> in index.html and mount our React app
// inside it. Everything the user sees flows from this single render call.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';            // The root component that contains the whole app
import './styles/globals.css';      // Load global CSS styles (fonts, resets, animations)

// Find the HTML element with id="root" where React will render the app.
// If it doesn't exist we throw an error immediately — nothing can work without it.
const root = document.getElementById('root');
if (!root) throw new Error('Root element not found. Check index.html.');

// Mount the React app.
// React.StrictMode is a development helper that highlights potential problems
// by running certain checks and warnings — it has no effect in production builds.
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
