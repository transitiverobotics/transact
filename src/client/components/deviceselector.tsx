import React, { useContext } from "react";
import _ from "lodash";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

import { FleetContext } from './fleetContext';

export default function DeviceSelector({onChange}) {
  const { fleet } = useContext(FleetContext);

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a device" />
      </SelectTrigger>
      <SelectContent>
        {fleet && _.map(fleet, (device, deviceId) => (
          <SelectItem key={deviceId} value={deviceId}>
            {device?.info?.os?.hostname || deviceId}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}