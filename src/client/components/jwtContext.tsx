import React, { createContext, useEffect, useState } from "react"

export const JWTContext = createContext({});

/** Fetch JWT for given device and capability and provide in context. */
export const JWTContextProvider = ({ children, device, capability }) => {
  const [jwt, setJwt] = useState();

  // Here we get a JWT from the backend
  useEffect(() => {
      const getToken = async () => {
        const result = await fetch('/api/getJWT', {
          method: 'post',
          body: JSON.stringify({ device, capability }),
          headers: { 'content-type': 'application/json' }
        });
        const json = await result.json();
        setJwt(json.token);
      };

      !jwt && getToken();
    }, []);

  return <JWTContext.Provider value={jwt}>
    {jwt && children}
  </JWTContext.Provider>;
};
