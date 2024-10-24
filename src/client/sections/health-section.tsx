import React from 'react';
import DeviceSelector from '@components/device-selector';
import { JWTCapability } from '@components/jwt-capability';
import { useNavigate, useParams } from 'react-router-dom';


export function HealthSection() {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col'>
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
        <div className='w-full flex-1'>
          <div className='relative'>
            <DeviceSelector deviceId={deviceId} capability='health-monitoring'
              onChange={(id: string) => navigate(`/dashboard/health/${id}`)}/>
          </div>
        </div>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        <div
          className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
        >
          {deviceId && <JWTCapability device={deviceId} capability={'@transitive-robotics/health-monitoring'} delimiters={'undefined'}/>}
        </div>
      </main>
    </div>
  );
}