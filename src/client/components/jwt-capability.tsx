import React, { useContext} from 'react';
import { TransitiveCapability } from '@transitive-sdk/utils-web';
import { JWTContext, JWTContextProvider } from './jwt-context';

// Get env vars on the front-end in Vite (anything with the VITE prefix)
// See sample.env for descriptions for these:
const host = import.meta.env.VITE_HOST; // Transitive deployment
const insecure = import.meta.env.VITE_INSECURE

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