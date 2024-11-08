import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CapabilityContext, getLogger} from '@transitive-sdk/utils-web';

import { BatteryWarning, BatteryCharging, BatteryFull, BatteryMedium, BatteryLow, Battery } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';

const log = getLogger('BatteryIcon');
log.setLevel('debug');


/**
 * BatteryIcon component displays the battery status of a device.
 * It subscribes to the `/battery_status` topic for the given device ID
 * and displays the battery icon based on the charge level.
 *
 * @component
 * @param {string} deviceId - The ID of the device to get the battery status for
 *
 * @example
 * // Usage example:
 * <BatteryIcon deviceId="device123" />
 *
 * @returns {JSX.Element} The rendered BatteryIcon component
 */
export const BatteryIcon = ({deviceId}) => {
  const capabilityContext = useContext(CapabilityContext);
  const [api, setApi] = useState();

  useEffect(() => {
    const _api = capabilityContext.getAPI(deviceId);
    log.debug('Subscribing to topic: /battery_status for device', deviceId);
    _api?.subscribe(1, '/battery_status');
    setApi(_api);
    // unsubscribe when React component unmounts
    return () => {
      log.debug('Unsubscribing from topic: /battery_status for device', deviceId);
      _api?.unsubscribe?.(1, '/battery_status');
    }
  }, [capabilityContext?.ready]);

  const batteryStatus = api?.deviceData?.ros?.[1].messages?.battery_status;

  return <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        {!batteryStatus ? <BatteryWarning /> :
            batteryStatus.power_supply_status === 1 ? <BatteryCharging /> :
            batteryStatus.charge > 90 ? <BatteryFull /> :
            batteryStatus.charge <= 90 && batteryStatus.charge > 50 ? <BatteryMedium /> :
            batteryStatus.charge <= 50 && batteryStatus.charge > 20 ? <BatteryLow /> :
          <Battery />
        }
      </TooltipTrigger>
      <TooltipContent>
        <p>{!batteryStatus ? 'Not available' : batteryStatus.charge}</p>
        <p>{!batteryStatus ? 'Not available' : batteryStatus.power_supply_status === 1 ? 'Charging' : 'Discharging'}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
}