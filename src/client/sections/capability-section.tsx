import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeviceSelector from '@components/device-selector';
import { JWTCapability } from '@components/jwt-capability';

interface SectionProps {
  capability: string;
  route: string;
  additionalProps?: Record<string, any>; // Props to be passed to JWTCapability
}

/** A reusable Section component, wrapping an given Transitive capability
* component and embedding props.
*
* Example:
*     <CapabilitySection
*       capability="webrtc-video"
*       route="/dashboard/video"
*       additionalProps={{ count: '1', type: 'videotestsrc' }}
*     />
* */
export function CapabilitySection({ capability, route, additionalProps = {} }: SectionProps) {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4
        lg:h-[60px] lg:px-6">
        <div className="w-full flex-1">
          <div className="relative">
            <DeviceSelector
              deviceId={deviceId}
              capability={capability}
              onChange={(id: string) => navigate(`${route}/${id}`)}
            />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-1 items-center justify-center rounded-lg
          border border-dashed shadow-sm">
          {deviceId && (
            <JWTCapability
              device={deviceId}
              capability={`@transitive-robotics/${capability}`}
              {...additionalProps}
            />
          )}
        </div>
      </main>
    </>
  );
}