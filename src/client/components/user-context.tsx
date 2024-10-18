import React, { useEffect, useState} from 'react';
import { getLogger, fetchJson, parseCookie }
from '@transitive-sdk/utils-web';
import { COOKIE_NAME } from '../../common/constants';

const log = getLogger('UserContext');
log.setLevel('debug');

export const UserContext = React.createContext({});
export const UserContextProvider = ({children}) => {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState();
  const [error, setError] = useState();
  const refresh = () => {
    const cookie = parseCookie(document.cookie);
    // log.debug('cookie', cookie);
    cookie[COOKIE_NAME] &&
      setSession(JSON.parse(cookie[COOKIE_NAME]));
    setReady(true);
  };

  useEffect(() => {
      // refresh cookie
      fetchJson(`/refresh`, (err, res) => {
        !err && log.debug('refreshed');
        refresh();
      });
    }, []);

  /** execute the login */
  const login = (user, password) =>
    fetchJson(`/login`,
      (err, res) => {
        if (err) {
          log.error(err);
          setError('Failed to log in, please check your credentials.');
        } else {
          setError(null);
          log.debug('logged in');
          refresh();
        }
      },
      {body: {name: user, password}});

  const logout = () => fetchJson('/logout',
    (err, res) => {
      if (err) {
        log.error(err);
      } else {
        refresh();
        log.debug('logged out');
        location.href = '/';
      }
    },
    {method: 'post'});

//   /** register new account */
//   const register = (user, password, email) =>
//     fetchJson(`/@transitive-robotics/_robot-agent/register`,
//       (err, res) => {
//         if (err) {
//           log.error(err, res);
//           setError(`Failed to register: ${res.error}`);
//         } else {
//           setError(null);
//           log.debug('registered');
//           refresh();
//         }
//       },
//       {body: {name: user, password, email}});

//   const forgot = (email) =>
//     fetchJson(`/@transitive-robotics/_robot-agent/forgot`,
//       (err, res) => {
//         if (err) {
//           log.error(err, res);
//           setError(`Failed to request reset link: ${res.error}`);
//         } else {
//           setError(null);
//           log.debug('reset link sent');
//         }
//       },
//       {body: {email}});

//   const reset = (user, password, code) =>
//     fetchJson(`/@transitive-robotics/_robot-agent/reset`,
//       (err, res) => {
//         if (err) {
//           log.error(err, res);
//           setError(`Failed to reset password: ${res.error}`);
//         } else {
//           setError(null);
//           log.debug('password reset');
//           location.href = '/';
//         }
//       },
//       {body: {name: user, password, code}});

  return <UserContext.Provider
    value={{ ready, session, login, logout, error }}>
    {children}
  </UserContext.Provider>;
};