import React, { createContext, useEffect, useContext } from 'react'
import _ from 'lodash';

import { JWTContext, JWTContextProvider } from './jwt-context';

import { useMqttSync, mergeVersions } from '@transitive-sdk/utils-web';
import { Device, Robot } from '@models/device';
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

  const fleet = [];
  _.forEach(data?.[transitiveId], (device, id) => {
    const device_data = mergeVersions(device['@transitive-robotics']['_robot-agent']);
    const capabilities = [];
    if (device_data?.status?.runningPackages && device_data?.status?.runningPackages['@transitive-robotics']) {
      capabilities.push(..._.map(device_data?.status?.runningPackages['@transitive-robotics'], (v, k) => k));
    }
    fleet.push(new Device(
      id,
      device_data?.info?.os?.hostname || id,
      device_data?.info?.os?.lsb?.Description || 'Unknown',
      device_data?.status?.heartbeat || new Date(),
      capabilities,
      Robot
    ));
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
