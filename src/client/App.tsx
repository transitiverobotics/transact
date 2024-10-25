import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import _ from 'lodash';

import './App.css';

import { Sidebar } from '@components/sidebar';
import { DevicesSection } from '@sections/devices-section';
import { ThemeProvider } from '@components/theme-provider';
import { FleetContextProvider } from '@components/fleet-context';
import { UserContextProvider } from '@components/user-context';
import { LoginWrapper } from '@components/login-wrapper';

import { getLogger} from '@transitive-sdk/utils-web';
import { capabilities, Capability} from '@models/device';

const log = getLogger('App');
log.setLevel('debug');

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <UserContextProvider>
          <LoginWrapper>
            <div className='grid min-h-screen w-full grid-rows-[40px_auto] md:grid-rows-[auto] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='shrink-0 md:hidden'
                  >
                    <Menu className='h-5 w-5' />
                    <span className='sr-only'>Toggle sections menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side='left' className='flex flex-col'>
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <div className='hidden border-r bg-muted/40 md:block'>
                <Sidebar />
              </div>
                <FleetContextProvider>
                  {/* Here we get a JWT for the entire fleet. This allows us to subscribe to
                    _robot-agent topics but not publish to them. We use this to get the list
                    of devices. */}
                  <Routes key='routes'>
                    <Route key='root' path='*' element={<Navigate to='/devices' />} />
                    <Route key='devices-section' path='/devices' element={<DevicesSection />} />
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
          </LoginWrapper>
        </UserContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;