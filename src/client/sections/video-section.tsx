import React from 'react';
import DeviceSelector from '@components/device-selector';
import { JWTCapability } from '@components/jwt-capability';
import { getLogger} from '@transitive-sdk/utils-web';
import { useNavigate, useParams } from 'react-router-dom';

const log = getLogger('VideoSection');
log.setLevel('debug');

export function VideoSection() {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col'>
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
        <div className='w-full flex-1'>
          <div className='relative'>
            <DeviceSelector deviceId={deviceId} onChange={(id: string) => navigate(`/video/${id}`)} capability='webrtc-video'/>
          </div>
        </div>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        <div
          className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        >
          {deviceId && <JWTCapability 
            device={deviceId}
            capability={'@transitive-robotics/webrtc-video'}
            count='1'
            quantizer='25'
            timeout='1800'
            type='videotestsrc'
          />}  
        </div>
      </main>
    </div>
  );
}