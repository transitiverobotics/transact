import React, { createContext, useEffect, useContext } from 'react'
import _ from 'lodash';

import { JWTContext, JWTContextProvider } from '@components/jwt-context';

import { useMqttSync, mergeVersions } from '@transitive-sdk/utils-web';
import { Capability, capabilities, Device, Robot } from '@models/device';
import { getLogger} from '@transitive-sdk/utils-web';


const log = getLogger('FleetContext');
log.setLevel('debug');

const host = import.meta.env.VITE_HOST; // Transitive deployment
const transitiveId = import.meta.env.VITE_TRANSITIVE_USER;
const SSLs = import.meta.env.VITE_INSECURE ? '' : 's';
const mqttUrl = `ws${SSLs}://mqtt.${host}`;

export const FleetContext = createContext({});

const ProviderWithJWT = ({ children }) => {
  const jwt = useContext(JWTContext);

  const { mqttSync, data, ready } = useMqttSync({jwt, id: transitiveId, mqttUrl});

  useEffect(() => {
      mqttSync?.mqtt.connected && mqttSync.subscribe(
        `/${transitiveId}/+/@transitive-robotics/_robot-agent/`,
        (err) => err && console.warn('Failed to subscribe', err));
    }, [mqttSync]);

    const fleet = _.map(data?.[transitiveId], (device, id) => {
      const device_data = mergeVersions(device['@transitive-robotics']['_robot-agent']);
      const running = device_data?.status?.runningPackages?.['@transitive-robotics'];
      // To tell whether a capability is running we need to also verify that at least
      // one of the values in the versions-object is truthy
      const deviceCapabilities = running ? Object.keys(_.pickBy(running,
          versions => Object.values(versions).some(Boolean))) : [];
  
      // we filter out those capabilities we don't use in this app
      const deviceKnownCapabilities = deviceCapabilities.filter(capability => capabilities.hasOwnProperty(capability));

      return new Device(
        id,
        device_data?.info?.os?.hostname || id,
        device_data?.info?.os?.lsb?.Description || 'Unknown',
        device_data?.status?.heartbeat || new Date(),
        deviceKnownCapabilities.map((capability: Capability) => capabilities[capability]),
        Robot
      );
    });

  // sort fleet
  fleet.sort((a, b) => a.name.localeCompare(b.name));

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
