import React, { useContext } from 'react';
import _ from 'lodash';

import { Link, useParams } from 'react-router-dom';
import { Capability, Device } from '@models/device';
import { Heartbeat } from '@components/heartbeat';
import { FleetContext } from '@components/fleet-context';
import { CircleArrowLeftIcon } from 'lucide-react';
import { JWTCapability } from '@components/jwt-capability';
import { getLogger} from '@transitive-sdk/utils-web';

const log = getLogger('DeviceSection');
log.setLevel('debug');


export function DeviceSection() {
  const { deviceId } = useParams();
  const { fleet } = useContext(FleetContext);

  const device = _.find(fleet, { id: deviceId }) as Device;
  if (!device) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
        <h1 className='text-xl font-bold'>
          {device.name}
        </h1>
        <Heartbeat heartbeat={device.heartbeat} refresh={true} />
        <Link to='/dashboard/devices' className='flex-grow'>
          <CircleArrowLeftIcon className='h-6 w-6 float-right' />
        </Link>        
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        <div
          className='grid rounded-lg border border-dashed shadow-sm gap-4'
        >
          {_.some(device.capabilities, (capability: Capability) => capability.id === 'remote-teleop') && (
            <JWTCapability
              device={deviceId}
              capability={'@transitive-robotics/remote-teleop'}
              control_rosVersion='1'
              control_topic='/joy'
              control_type='sensor_msgs/Joy'
              count='1'
              quantizer='25'
              timeout='1800'
              type='videotestsrc'
            />
          )}
          {_.some(device.capabilities, (capability: Capability) => capability.id === 'terminal') && (
            <JWTCapability device={deviceId} capability={'@transitive-robotics/terminal'} />
          )}
          {_.some(device.capabilities, (capability: Capability) => capability.id === 'health-monitoring') && (
            <JWTCapability device={deviceId} capability={'@transitive-robotics/health-monitoring'} delimiters={'undefined'}/>
          )}
        </div>
      </main>
    </>
  );
}