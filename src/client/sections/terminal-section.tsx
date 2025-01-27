import React from 'react';
import DeviceSelector from '@components/device-selector';
import { JWTCapability } from '@components/jwt-capability';
import { getLogger} from '@transitive-sdk/utils-web';
import { useNavigate, useParams } from 'react-router-dom';

const log = getLogger('TerminalSection');
log.setLevel('debug');

export function TerminalSection() {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
        <div className='w-full flex-1'>
          <div className='relative'>
            <DeviceSelector deviceId={deviceId} capability='terminal'
              onChange={(id: string) => navigate(`/dashboard/terminal/${id}`)}/>
          </div>
        </div>
      </header>
      <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        <div
          className='flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        >
          {deviceId && <JWTCapability device={deviceId} capability={'@transitive-robotics/terminal'}/>}
        </div>
      </main>
    </>
  );
}