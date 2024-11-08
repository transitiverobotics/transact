import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CapabilityContext, getLogger} from '@transitive-sdk/utils-web';

const log = getLogger('CityLabel');
log.setLevel('debug');

const CITY_TOPIC = '/location/city';

/**
 * CityLabel component subscribes to a specific topic to retrieve and display the city name
 * associated with a given device. It uses the CapabilityContext to get the API for the device
 * and subscribes to the CITY_TOPIC to receive updates.
 *
 * @component
 * @param {string} deviceId - The ID of the device to retrieve the city name for
 *
 * @example
 * // Usage example:
 * <CityLabel deviceId="device123" />
 *
 * @returns {JSX.Element} A div containing the city name or a dash if the city name is not available
 */
export const CityLabel = ({deviceId}) => {
  const capabilityContext = useContext(CapabilityContext);
  const [api, setApi] = useState();

  useEffect(() => {
    if (!capabilityContext.ready) {
      return;
    }
    const _api = capabilityContext.getAPI(deviceId);
    log.debug('Subscribing to topic:', CITY_TOPIC, 'for device:', deviceId);
    _api?.subscribe(1, CITY_TOPIC);
    setApi(_api);
    // unsubscribe when React component unmounts
    return () => {
      log.debug('Unsubscribing from topic:', CITY_TOPIC, 'for device:', deviceId);
      _api?.unsubscribe?.(1, CITY_TOPIC);
    }
  }, [capabilityContext?.ready]);

  const city = api?.deviceData?.ros?.[1].messages?.location?.city?.data;

  return <div>
    {!city ? '-' : city}
  </div>
}