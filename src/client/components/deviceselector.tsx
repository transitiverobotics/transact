import React, { useContext } from "react";
import _ from "lodash";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"

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
        {fleet && _.map(fleet, (device, key) => (
          <SelectItem key={key} value={key}>{key}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}