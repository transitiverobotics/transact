import React, { createContext, useEffect, useState } from 'react'
import { getLogger} from '@transitive-sdk/utils-web';

const log = getLogger('JWTContext');
log.setLevel('debug');

export const JWTContext = createContext({});

/** Fetch JWT for given device and capability and provide in context. */
export const JWTContextProvider = ({ children, device, capability = '' }) => {
  const [jwt, setJwt] = useState();

  // Here we get a JWT from the backend
  useEffect(() => {
      const getToken = async () => {
        if (!device) return
        const result = await fetch('/api/getJWT', {
          method: 'post',
          body: JSON.stringify({ device, capability }),
          headers: { 'content-type': 'application/json' }
        });
        const json = await result.json();
        setJwt(json.token);
      };

      getToken();
    }, [device]);

  return <JWTContext.Provider value={jwt}>
    {jwt && children}
  </JWTContext.Provider>;
};
