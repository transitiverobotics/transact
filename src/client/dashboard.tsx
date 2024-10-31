import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import _ from 'lodash';

import { Sidebar } from '@components/sidebar';
import { FleetContextProvider } from '@components/fleet-context';

import { getLogger} from '@transitive-sdk/utils-web';
import { Capability, capabilities } from '@models/device';
import { DevicesSection } from '@sections/devices-section';
import { DeviceSection } from '@sections/device-section';
import { UserContext } from '@components/user-context';

const log = getLogger('DashBoard');
log.setLevel('debug');


function DashBoard() {
  const {ready} = useContext(UserContext);
  if (!ready) {
    return <div>Loading...</div>;
  }
  return (
    <div className='grid min-h-screen max-h-screen grid-rows-[3.5rem_1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sections menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <Sidebar />
      <FleetContextProvider>
        {/* Here we get a JWT for the entire fleet. This allows us to subscribe to
          _robot-agent topics but not publish to them. We use this to get the list
          of devices. */}
        <Routes key='routes'>
          <Route path='*' element={<Navigate to='devices' />} />
          <Route key='devices-section' path='/devices' element={<DevicesSection />} />
          <Route key='device-section' path='/devices/:deviceId' element={<DeviceSection />} />
          {_.map(
            _.filter(capabilities, (capability: Capability) => capability.route),
            (capability: Capability, capabilityId: string) => (
              <Route
                key={capabilityId}
                path={capability.route}
                element={<capability.section />}
              />
            )
          )}
          {_.map(
            _.filter(capabilities, (capability: Capability) => capability.route),
            (capability: Capability, capabilityId: string) => (
              <Route
                key={capabilityId + '_device'}
                path={`${capability.route}/:deviceId`}
                element={<capability.section />}
              />
            )
          )}                    
        </Routes>
      </FleetContextProvider>
    </div>
  );
}

export default DashBoard;