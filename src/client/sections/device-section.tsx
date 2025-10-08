import React, { useContext } from 'react';
import _ from 'lodash';

import { Link, useParams } from 'react-router-dom';
import { Device } from '@models/device';
import { Heartbeat } from '@components/heartbeat';
import { FleetContext } from '@components/fleet-context';
import { CircleArrowLeftIcon } from 'lucide-react';
import { JWTCapability } from '@components/jwt-capability';
import { BatteryIcon } from '@components/battery-icon';

import { MapComponent } from '@components/map-component';
import { getLogger} from '@transitive-sdk/utils-web';
import { TriggerServiceButton } from '@components/trigger-service-button';

const log = getLogger('DeviceSection');
log.setLevel('debug');


export function DeviceSection() {
  const { deviceId } = useParams();
  const { fleet } = useContext(FleetContext);

  const device = _.find(fleet, { id: deviceId }) as Device;
  if (!device) {
    return <div>Loading Device section</div>;
  }
  return (
    <>
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4
        lg:h-[60px] lg:px-6'>
        <h1 className='text-xl font-bold'>
          {device.name}
        </h1>
        <Heartbeat heartbeat={device.heartbeat} refresh={true} />
        <BatteryIcon deviceId={device.id} />
        <Link to='/dashboard/devices' className='flex-grow'>
          <CircleArrowLeftIcon className='h-6 w-6 float-right' />
        </Link>
      </header>

      <main className='grid p-4 lg:p-6 overflow-y-auto'>
        <div
          className='flex flex-wrap gap-6 p-4 items-stretch content-start
          rounded-lg border border-dashed shadow-sm relative'
        >
          {device.capabilities['robot-lock'] && (
              <div className='w-full'>
                <JWTCapability device={deviceId}
                  capability={device.capabilities['robot-lock'].id} />
              </div>
          )}
          {device.capabilities['remote-teleop'] && (
              <div className='grow-0 basis-3/5 shrink m-auto'>
                <JWTCapability
                  device={deviceId}
                  capability={device.capabilities['remote-teleop'].id}
                  control_rosVersion='1'
                  control_topic='/joy'
                  control_type='sensor_msgs/Joy'
                  count='2'
                  quantizer='25'
                  timeout='1800'
                  type='videotestsrc'
                  type_1='videotestsrc'
                  />
              </div>
            )}

          <div className='grow'>
            <div>
              <div className='h-80'>
                <MapComponent deviceId={deviceId} />
              </div>
              <div className='p-2'>
                <TriggerServiceButton deviceId={deviceId} service={'/dock'}
                  successToast='Arrived to Dock!'>
                  Return to dock
                </TriggerServiceButton>&nbsp;
                <TriggerServiceButton deviceId={deviceId} service={'/goto_philz_coffee'}
                  successToast="Arrived to Philz Coffee!">
                  Go to Philz Coffee
                </TriggerServiceButton>
              </div>
            </div>
            {device.capabilities['health-monitoring'] && (
                <div>
                  <JWTCapability device={deviceId}
                    capability={device.capabilities['health-monitoring'].id}
                    delimiters={'undefined'}/>
                </div>
            )}
          </div>

          {device.capabilities['terminal'] && (
              <div className='w-full h-1/4'>
                <JWTCapability device={deviceId}
                  capability={device.capabilities['terminal'].id } />
              </div>
          )}
        </div>
      </main>
    </>
  );
}