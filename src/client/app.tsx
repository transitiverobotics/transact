import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import _ from 'lodash';

import './app.css';

import { ThemeProvider } from './components/theme-provider.js';
import { UserContextProvider } from './components/user-context.js';
import { Login } from './components/login.js';

import { getLogger} from '@transitive-sdk/utils-web';
import DashBoard from './dashboard.js';

const log = getLogger('App');
log.setLevel('debug');


function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <UserContextProvider>          
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/dashboard/*' element={<DashBoard/>} />
          </Routes>
        </UserContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;