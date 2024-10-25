import React, { useContext } from 'react';
import _ from 'lodash';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'

import { FleetContext } from '@components/fleet-context';
import { Device } from '@models/device';
import { getLogger} from '@transitive-sdk/utils-web';

const log = getLogger('DeviceSelector');
log.setLevel('debug');

export default function DeviceSelector({ deviceId, onChange, capability: capabilityId }:
    { deviceId: string, onChange: (value: string) => void; capabilityId: string }) {

  const { fleet } = useContext(FleetContext);

  return (
    <Select value={deviceId} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select a device' />
      </SelectTrigger>
      <SelectContent>
        {fleet && _.map(fleet, (device: Device) => (
          <SelectItem key={device.id} value={device.id} disabled={!_.some(device.capabilities, { id: capabilityId })}>
            {device.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}