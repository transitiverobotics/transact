import React, { useContext} from "react";
import { TransitiveCapability } from '@transitive-sdk/utils-web';
import { JWTContext, JWTContextProvider } from './jwtContext';

// Get env vars on the front-end in Vite (anything with the VITE prefix)
// See sample.env for descriptions for these:
const host = import.meta.env.VITE_HOST; // Transitive deployment
const transitiveId = import.meta.env.VITE_TRANSITIVE_USER;
const insecure = import.meta.env.VITE_INSECURE
const SSLs = insecure ? '' : 's';
const transitivePortal = `http${SSLs}://portal.${host}`;
const mqttUrl = `ws${SSLs}://mqtt.${host}`;

const Capability = (props) => {
  const jwt = useContext(JWTContext);
  return <TransitiveCapability
    jwt={jwt}
    host={host}
    ssl={!insecure}
    {...props}
    />
};

export function JWTCapability({device, capability, ...props}) {
  return (
    <JWTContextProvider device={device} capability={capability}>
      <Capability {...props}/>
    </JWTContextProvider>
  );
}