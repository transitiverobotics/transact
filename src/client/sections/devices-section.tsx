import React, { useContext } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { FleetContext } from '../components/fleet-context';
import _ from "lodash";
import { Heartbeat } from "../components/heartbeat";

export function DevicesSection() {
  const { fleet } = useContext(FleetContext);
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <div className="w-full flex-1">
          <div className="relative">
            Your Devices
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div
          className="flex flex-1 rounded-lg border border-dashed shadow-sm"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {_.map(fleet, (device, deviceId) => (
                <TableRow key={deviceId}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {device?.info?.os?.hostname || deviceId}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {device?.info?.os?.lsb?.Description || ""}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2">
                      <span>
                        {device?.status?.heartbeat && (
                          <Heartbeat
                            heartbeat={device.status.heartbeat}
                            refresh={true}
                          />
                        )}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}