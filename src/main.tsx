import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Keycloak from 'keycloak-js';

// Keycloak configuration
const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'RuleMaster', 
  clientId: 'rulemasterai', 
};

const keycloak = new Keycloak(keycloakConfig);

keycloak.init({ onLoad: 'login-required' })
  .then((authenticated) => {
    if (authenticated) {
      console.log('User is authenticated');
      createRoot(document.getElementById('root')!).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    } else {
      console.log('User is not authenticated');
    }
  })
  .catch((error) => {
    console.error('Keycloak initialization failed:', error);
  });
