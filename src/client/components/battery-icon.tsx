import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CapabilityContext, getLogger} from '@transitive-sdk/utils-web';

import { BatteryWarning, BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, Battery } from 'lucide-react';

const log = getLogger('BatteryIcon');
log.setLevel('debug');


export const BatteryIcon = ({deviceId}) => {
  const capabilityContext = useContext(CapabilityContext);
  const [api, setApi] = useState();

  useEffect(() => {
    const _api = capabilityContext.getAPI(deviceId);
    log.debug('Subscribing to topic: /battery_status for device', deviceId);
    _api?.subscribe(1, '/battery_status');
    // unsubscribe when React component unmounts
    setApi(_api);
    return () => {
      log.debug('Unsubscribing from topic: /battery_status for device', deviceId);
      _api?.unsubscribe?.(1, '/battery_status');
    }
  }, [capabilityContext?.ready]);

  const batteryStatus = api?.deviceData?.ros?.[1].messages?.battery_status;

  return <div>
    {!batteryStatus ? <BatteryWarning /> :
      batteryStatus.power_supply_status === 1 ? <BatteryCharging /> :
      batteryStatus.charge > 90 ? <BatteryFull /> :
      batteryStatus.charge <= 90 && batteryStatus.charge > 50 ? <BatteryMedium /> :
      batteryStatus.charge <= 50 && batteryStatus.charge > 20 ? <BatteryLow /> :
      <Battery />
    }
  </div>
}