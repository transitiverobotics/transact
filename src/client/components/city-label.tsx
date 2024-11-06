import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CapabilityContext, getLogger} from '@transitive-sdk/utils-web';

const log = getLogger('CityLabel');
log.setLevel('debug');

const CITY_TOPIC = '/location/city';

export const CityLabel = ({deviceId}) => {
  const capabilityContext = useContext(CapabilityContext);
  const [api, setApi] = useState();

  useEffect(() => {
    if (!capabilityContext.ready) {
      return;
    }
    const _api = capabilityContext.getAPI(deviceId);
    log.debug()
    _api?.subscribe(1, '/city');
    // unsubscribe when React component unmounts
    setApi(_api);
    return () => {
      log.debug('Unsubscribing from topic: /city for device', deviceId);
      _api?.unsubscribe?.(1, '/city');
    }
  }, [capabilityContext?.ready]);

  const city = api?.deviceData?.ros?.[1].messages?.city?.data;

  return <div>
    {!city ? 'Loading...' : city}
  </div>
}