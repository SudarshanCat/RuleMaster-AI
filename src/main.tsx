import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Keycloak from 'keycloak-js';
import KeycloakContext from './contexts/KeycloakContext.tsx';
import RealmInputPage from './components/RealmInputPage.tsx'; // You'll create this component

// Keycloak configuration (keep the base URL)
const keycloakConfig = {
  url:'https://rule-engine-builder.onrender.com',
  // realm: 'rbtenanttwo', // Remove the hardcoded realm
  clientId: 'rb-backend-server',
};

function Root() {
  const [realm, setRealm] = useState<string | null>(null);
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Function to handle realm submission and verification
  const handleRealmSubmit = async (submittedRealm: string) => {
    const realmVerificationUrl = `${keycloakConfig.url}/api/v1/realmVerfication?realm=${submittedRealm}`;

    

    try {
      const response = await fetch(realmVerificationUrl, {
        method: 'GET', // Or the appropriate HTTP method
        // headers: {
        //   'Origin': 'https://9000-firebase-rulesmaster-ai-1750832992069.cluster-ikxjzjhlifcwuroomfkjrx437g.cloudworkstations.dev' // Example: Add a custom header
        // },
      });

      if (!response.ok) {
        // Handle verification failure (display error on RealmInputPage)
        console.error('Realm verification failed:', response.statusText);
        // You might want to update state in RealmInputPage to show the error
        return;
      }

      // Realm verification successful, set realm and initialize Keycloak
      setRealm(submittedRealm);
      const kc = new Keycloak({...keycloakConfig, realm: submittedRealm});
      setKeycloak(kc);

      kc.init({ onLoad: 'login-required' })
        .then((authenticated) => {
          setInitialized(true);
          if (authenticated) {
            console.log('User is authenticated');
            // App will render because keycloak and initialized state are updated
          } else {
            console.log('User is not authenticated');
          }
        })
        .catch((error) => {
          console.error('Keycloak initialization failed:', error);
          // Handle initialization failure (display error)
        });

    } catch (error) {
      console.error('Error during realm verification fetch:', error);
      // Handle fetch error (display error on RealmInputPage)
    }
  };

  if (!realm || !initialized) {
    return <RealmInputPage onSubmit={handleRealmSubmit} />;
  }

  if (!keycloak) {
    // This case should ideally not happen if realm is set and initialized is true
    return <div>Error initializing Keycloak.</div>;
  }


  return (
    <StrictMode>
      <KeycloakContext.Provider value={{ keycloak, initialized }}>
        <App />
      </KeycloakContext.Provider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
