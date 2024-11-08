import React, { useEffect, useReducer, useState } from 'react';

import { FaCircle, FaRegCircle } from 'react-icons/fa';

const STALE_THRESHOLD = 3 * 24 * 60 * 60 * 1e3;
const WARNING_THRESHOLD = 1.15 * 60 * 1e3;

const levels = [
  {color: '#2e912e', comp: FaCircle, label: 'online'},
  {color: '#bd0000', comp: FaCircle, label: 'offline'},
  {color: '#777', comp: FaRegCircle, label: 'inactive'},
];

/** get heartbeat level (index into `levels`) */
export const heartbeatLevel = (heartbeat) => {
  const timediff = Date.now() - (new Date(heartbeat));
  return timediff > STALE_THRESHOLD ? 2
  : timediff > WARNING_THRESHOLD ? 1
  : 0;
}

/**
 * Heartbeat component displays the status of a device's heartbeat signal.
 * It shows an icon with a color indicating the status and a tooltip with the timestamp.
 * 
 * The component will automatically refresh and update its display based on the heartbeat timestamp.
 * 
 * @param {number} heartbeat - The timestamp of the heartbeat signal.
 * @param {boolean} [refresh=true] - Whether the component should automatically refresh.
 * 
 * @returns {JSX.Element} The rendered Heartbeat component.
 * 
 * @example
 * ```tsx
 * <Heartbeat heartbeat={Date.now()} refresh={true} />
 * ```
 */
export const Heartbeat = ({heartbeat, refresh = true}) => {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [timer, setTimer] = useState();

  const date = new Date(heartbeat);
  refresh && useEffect(() => {
      // force an update a while after last heartbeat to show offline if necessary
      timer && clearTimeout(timer);
      const timeout = date - Date.now() + WARNING_THRESHOLD + 1;
      setTimer(setTimeout(forceUpdate, timeout));
    }, [heartbeat]);

  const level = levels[heartbeatLevel(heartbeat)];
  const Comp = level.comp;

  return <span
    style={{
      color: level.color,
    }}
    title={`${level.label}: ${date.toLocaleString()}`}>
    <Comp className='h-4 w-4'/>
  </span>
};