import { createRoot } from 'react-dom/client'
import WebApp from "@twa-dev/sdk";

import './index.css'
import './output.css';

import App from './App.tsx'

WebApp.ready();

createRoot(document.getElementById('root')!).render(
  <App />
)
