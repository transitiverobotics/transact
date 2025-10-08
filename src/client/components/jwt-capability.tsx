import React, { useContext} from 'react';
import { TransitiveCapability, CapabilityContext, CapabilityContextProvider,
    decodeJWT, getLogger } from '@transitive-sdk/utils-web';
import { JWTContext, JWTContextProvider } from './jwt-context';

const log = getLogger('JWTContext');
log.setLevel('debug');

// Get env vars on the front-end in Vite (anything with the VITE prefix)
// See sample.env for descriptions for these:
const host = import.meta.env.VITE_HOST; // Transitive deployment
const insecure = import.meta.env.VITE_INSECURE

/** Component that shows the context (front-end API) provided by the
* capability, if any */
const ShowContext = ({jwt}) => {
  const context = useContext(CapabilityContext);
  const {capability} = decodeJWT(jwt);
  log.debug(`Capability ${capability} provides:`, context);
};

const Capability = (props) => {
  const jwt = useContext(JWTContext);

  return <>
    <CapabilityContextProvider jwt={jwt} host={host} ssl={!insecure}>
      <ShowContext jwt={jwt}/>
    </CapabilityContextProvider>

    <TransitiveCapability
      jwt={jwt}
      host={host}
      ssl={!insecure}
      {...props}
      />
  </>;
};

export function JWTCapability({device, capability, ...props}) {
  return (
    <JWTContextProvider device={device} capability={capability}>
      <Capability {...props}/>
    </JWTContextProvider>
  );
}