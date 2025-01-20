import React, { useContext } from 'react';
import _ from 'lodash';

import { Link, useParams } from 'react-router-dom';
import { Capability, Device } from '@models/device';
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
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
        <h1 className='text-xl font-bold'>
          {device.name}
        </h1>
        <Heartbeat heartbeat={device.heartbeat} refresh={true} />
        <BatteryIcon deviceId={device.id} />
        <Link to='/dashboard/devices' className='flex-grow'>
          <CircleArrowLeftIcon className='h-6 w-6 float-right' />
        </Link>
      </header>
      <main className='grid p-4 lg:p-6 overflow-hidden'>
        <div
          className='flex flex-wrap gap-6 p-4 items-stretch content-start rounded-lg border border-dashed shadow-sm overflow-y-auto relative'
        >
          {_.some(device.capabilities, (capability: Capability) => capability.id === 'remote-teleop') && (
            <div className='grow-0 basis-1/3 shrink'>
              <JWTCapability
                device={deviceId}
                capability={'@transitive-robotics/remote-teleop'}
                control_rosVersion='1'
                control_topic='/joy'
                control_type='sensor_msgs/Joy'
                count='3'
                quantizer='25'
                timeout='1800'
                type='videotestsrc'
                type_1='videotestsrc'
                type_2='videotestsrc'
              />
            </div>
          )}
          <div className='basis-1/3 grow'>
            <div className='h-1/2'>
              <div className='h-3/4'>
                <MapComponent deviceId={deviceId} />
              </div>
              <div className='p-2'>
                <TriggerServiceButton deviceId={deviceId} service={'/dock'} successToast='Arrived to Dock!'>
                  Return to dock
                </TriggerServiceButton>
                <TriggerServiceButton deviceId={deviceId} service={'/goto_philz_coffee'} successToast="Arrived to Philz Coffee!">
                  Go to Philz Coffee
                </TriggerServiceButton>
              </div>
            </div>
            {_.some(device.capabilities, (capability: Capability) => capability.id === 'health-monitoring') && (
              <div className='h-1/2'>
                <JWTCapability device={deviceId} capability={'@transitive-robotics/health-monitoring'} delimiters={'undefined'}/>
              </div>
            )}
          </div>

          {_.some(device.capabilities, (capability: Capability) => capability.id === 'terminal') && (
            <div className='w-full h-1/4'>
              <JWTCapability device={deviceId} capability={'@transitive-robotics/terminal'} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}