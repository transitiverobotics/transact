import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CapabilityContext, getLogger} from '@transitive-sdk/utils-web';
import { Button } from '@components/ui/button';
import { toast } from 'sonner';

const log = getLogger('DockButton');
log.setLevel('debug');


export const TriggerServiceButton = ({deviceId, service, children, successToast=''}) => {
  const capabilityContext = useContext(CapabilityContext);
  const [api, setApi] = useState();
  const [triggering, setTriggering] = useState(false);

  useEffect(() => {
    if (!capabilityContext.ready) {
      return;
    }
    const _api = capabilityContext.getAPI(deviceId);
    setApi(_api);
  }, [capabilityContext?.ready]);

  const trigger = () => {
    setTriggering(true);
    api?.callService(1, service, 'std_srvs/Trigger', {}, (err, response) => {
        setTriggering(false);
        if (err) {
          log.warn.warn('Service call failed', err);
        } else {
          if (successToast) {
            toast.success(successToast);
          }
          log.debug('Service call succeeded', response);
        }
    });
  }

  return <Button variant='outline' onClick={trigger} disabled={triggering}>
    {children}
  </Button>
}