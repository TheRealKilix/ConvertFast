import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Wait for DOM to be ready
function initApp() {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Root element not found');
    if (typeof window.showError === 'function') {
      window.showError('Erreur de chargement: element racine introuvable');
    }
    return;
  }

  try {
    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );

    // Hide loading screen after successful render
    requestAnimationFrame(() => {
      if (typeof window.hideLoadingScreen === 'function') {
        window.hideLoadingScreen();
      }
    });
  } catch (error) {
    console.error('React initialization error:', error);
    if (typeof window.showError === 'function') {
      window.showError("Erreur d'initialisation de l'application");
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM already loaded
  initApp();
}

// Export for window object
declare global {
  interface Window {
    hideLoadingScreen: () => void;
    showError: (message?: string) => void;
  }
}
