import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger }
  from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import _ from 'lodash';

import { Sidebar } from '@components/sidebar';
import { FleetContextProvider } from '@components/fleet-context';

import { getLogger} from '@transitive-sdk/utils-web';
import { Capability, capabilities } from '@models/device';
import { DevicesSection } from '@sections/devices-section';
import { DeviceSection } from '@sections/device-section';
import { CapabilitySection } from '@sections/capability-section';
import { UserContext } from '@components/user-context';

const log = getLogger('DashBoard');
log.setLevel('debug');


function DashBoard() {
  const {ready} = useContext(UserContext);
  if (!ready) {
    return <div>Loading...</div>;
  }
  return (
    <div className='grid min-h-screen max-h-screen grid-rows-[3.5rem_1fr]
      md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden mt-2 ml-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className='hidden md:grid row-span-2'>
        <Sidebar />
      </div>
      <FleetContextProvider>
        {/* Here we get a JWT for the entire fleet. This allows us to subscribe to
          _robot-agent topics but not publish to them. We use this to get the list
          of devices. */}
        <Routes key='routes'>
          <Route path='*' element={<Navigate to='devices' />} />
          <Route key='devices-section' path='/devices'
            element={<DevicesSection />} />
          <Route key='device-section' path='/devices/:deviceId'
            element={<DeviceSection />} />
          {_.map(
            _.filter(capabilities, (capability: Capability) => capability.route),
            (capability: Capability, capabilityId: string) => (
              <Route
                key={capabilityId}
                path={capability.route}
                element={
                    <CapabilitySection
                      capability={capability.id}
                      route={`/dashboard${capability.route}`}
                      additionalProps={capability.props}/>
                  }
                  />))
          }
          {_.map(
            _.filter(capabilities, (capability: Capability) => capability.route),
            (capability: Capability, capabilityId: string) => (
              <Route
                key={capabilityId + '_device'}
                path={`${capability.route}/:deviceId`}
                element={
                  <CapabilitySection
                  capability={capability.id}
                  route={`/dashboard${capability.route}`}
                  additionalProps={capability.props}/>
                }
              />
            )
          )}
        </Routes>
      </FleetContextProvider>
    </div>
  );
}

export default DashBoard;