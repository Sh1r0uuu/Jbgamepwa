import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import fungsi register PWA
import { registerSW } from 'virtual:pwa-register'

// Logika Auto-Update
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Konten baru tersedia. Reload sekarang?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App siap bekerja offline");
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)