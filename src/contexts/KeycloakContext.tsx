import { createContext, useContext } from 'react';

import Keycloak from 'keycloak-js';

interface KeycloakContextProps {
  keycloak: Keycloak | null;
  initialized: boolean;
}

const KeycloakContext = createContext<KeycloakContextProps>({
  keycloak: null,
  initialized: false,
});

export const useKeycloakContext = () => useContext(KeycloakContext);

export { KeycloakContext }; 
export default KeycloakContext;