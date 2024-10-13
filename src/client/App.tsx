import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from
  'react-router-dom';

import { Sidebar } from './components/sidebar';
import { TopBar } from './components/topbar';
import { DevicesSection } from './sections/devicessection';
import { VideoSection } from './sections/videosection';
import { TerminalSection } from './sections/terminalsection';
import { HealthSection } from './sections/healthsection';
import { ConfigSection } from './sections/configsection';
import { TeleopSection } from './sections/teleopsection';
import { ThemeProvider } from './components/theme-provider';
import { FleetContext, FleetContextProvider } from './components/fleetContext';

import _ from 'lodash';

import './App.css';

// Just an example how to get env vars on the front-end in Vite (anything with
// the VITE prefix)
// See sample.env for descriptions for these:
const host = import.meta.env.VITE_HOST; // Transitive deployment
const transitiveId = import.meta.env.VITE_TRANSITIVE_USER;
const SSLs = import.meta.env.VITE_INSECURE ? '' : 's';
const transitivePortal = `http${SSLs}://portal.${host}`;
const mqttUrl = `ws${SSLs}://mqtt.${host}`;

const sections = {
  Devices: DevicesSection,
  Video: VideoSection,
  Teleoperation: TeleopSection,
  Terminal: TerminalSection,
  Health: HealthSection,
  Configuration: ConfigSection,
};


function App() {

  return (
    <Router>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        {/* Here we get a JWT for the entire fleet. This allows us to subscribe to
          _robot-agent topics but not publish to them. We use this to get the list
          of devices. */}
        <FleetContextProvider>
          <div className='grid h-screen grid-rows-[50px_auto] grid-cols-[300px_auto] '>
            <TopBar />
            <Sidebar sections={sections} />
            <div className='overflow-y-auto p-4'>
              <Routes>
                { _.map(sections, (Element, section) =>
                    <Route key={section}
                      path={section.toLowerCase()}
                      element={<Element />} />)
                }
              </Routes>
            </div>
          </div>
        </FleetContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
