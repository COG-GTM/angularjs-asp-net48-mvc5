import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

// The ASP.NET MVC view and the Vite index.html both contain an <app-root>
// element (preserved from the Angular app). Mount React into it so the SPA
// loads exactly the way the Angular bootstrap did.
const container =
  document.querySelector('app-root') ?? document.getElementById('root');

if (!container) {
  throw new Error('Unable to find the <app-root> mount element.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
