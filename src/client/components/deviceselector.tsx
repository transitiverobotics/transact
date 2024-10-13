import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

import { my_fake_devices } from "../models/device";

import { FleetContext } from './fleetContext';

export default function DeviceSelector({onChange}) {
  const { fleet } = useContext(FleetContext);

  console.log('fleet', fleet);
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a device" />
      </SelectTrigger>
      <SelectContent>
        {my_fake_devices.map((device, i) => (
          <SelectItem key={`${device}-${i}`} value={device.name}>{device.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}