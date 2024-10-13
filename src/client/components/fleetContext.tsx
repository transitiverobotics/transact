import React, { createContext, useEffect, useState, useContext } from "react"

import { JWTContext, JWTContextProvider } from './jwtContext';

import { useMqttSync } from '@transitive-sdk/utils-web';

const host = import.meta.env.VITE_HOST; // Transitive deployment
const transitiveId = import.meta.env.VITE_TRANSITIVE_USER;
const SSLs = import.meta.env.VITE_INSECURE ? '' : 's';
const transitivePortal = `http${SSLs}://portal.${host}`;
const mqttUrl = `ws${SSLs}://mqtt.${host}`;

export const FleetContext = createContext({});

const ProviderWithJWT = ({ children }) => {
  const jwt = useContext(JWTContext);

  const { mqttSync, data, ready } = useMqttSync({jwt, id: transitiveId, mqttUrl});
  window.mqttSync = mqttSync;

  useEffect(() => {
      mqttSync?.mqtt.connected && mqttSync.subscribe(
        `/${transitiveId}/+/@transitive-robotics/_robot-agent/`,
        (err) => err && console.warn('Failed to subscribe', err));
    }, [mqttSync]);

  const fleet = data?.[transitiveId];
  console.log('data', jwt, ready, data);

  return <FleetContext.Provider value={{ mqttSync, fleet }}>
    {children}
  </FleetContext.Provider>;
};

/** A context with basic fleet data (names, status of devices). */
export const FleetContextProvider = ({ children }) => {
  return <JWTContextProvider device='_fleet'>
    <ProviderWithJWT>
      {children}
    </ProviderWithJWT>
  </JWTContextProvider>;
};
