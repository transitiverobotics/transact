import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Bot, HeartPulse, Joystick, Menu, SlidersHorizontal, Terminal, Video } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet';
import { Button } from '@components/ui/button';
import _ from 'lodash';

import './App.css';

import { Sidebar } from '@components/sidebar';
import { DevicesSection } from '@sections/devices-section';
import { VideoSection } from '@sections/video-section';
import { TerminalSection } from '@sections/terminal-section';
import { HealthSection } from '@sections/health-section';
import { ConfigSection } from '@sections/config-section';
import { TeleopSection } from '@sections/teleop-section';
import { ThemeProvider } from '@components/theme-provider';
import { FleetContextProvider } from '@components/fleet-context';
import { UserContextProvider } from '@components/user-context';
import { LoginWrapper } from '@components/login-wrapper';

import { getLogger} from '@transitive-sdk/utils-web';

const log = getLogger('App');
log.setLevel('debug');

interface Section {
  name: string;
  route: string;
  element: React.ComponentType;
  icon: JSX.Element;
}

const sections: Section[] = [
  {
    name: 'Devices',
    route: 'devices',
    element: DevicesSection,
    icon: <Bot />,
  },
  {
    name: 'Video',
    route: 'video',
    element: VideoSection,
    icon: <Video />,
  },
  {
    name: 'Teleoperation',
    route: 'teleoperation',
    element: TeleopSection,
    icon: <Joystick />,
  },
  {
    name: 'Terminal',
    route: 'terminal',
    element: TerminalSection,
    icon: <Terminal />,
  },
  {
    name: 'Health',
    route: 'health',
    element: HealthSection,
    icon: <HeartPulse />,
  },
  {
    name: 'Configuration',
    route: 'configuration',
    element: ConfigSection,
    icon: <SlidersHorizontal />,
  },
];


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
                  <Sidebar sections={sections} />
                </SheetContent>
              </Sheet>
              <div className='hidden border-r bg-muted/40 md:block'>
                <Sidebar sections={sections} />
              </div>
                <FleetContextProvider>
                  {/* Here we get a JWT for the entire fleet. This allows us to subscribe to
                    _robot-agent topics but not publish to them. We use this to get the list
                    of devices. */}
                  <Routes>
                    <Route path='/' element={<DevicesSection />} />
                    {_.map(sections, (section) => (
                        <>
                        <Route
                          key={section.name}
                          path={section.route}
                          element={<section.element />}
                        />
                        <Route
                          key={section.name}
                          path={`${section.route}/:deviceId`}
                          element={<section.element />}
                        />
                      </>
                    ))}
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