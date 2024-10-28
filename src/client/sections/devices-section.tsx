import React, { useContext } from 'react';
import _ from 'lodash';

import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Badge, badgeVariants } from '@components/ui/badge';


import { Capability, Device } from '@models/device';
import { FleetContext } from '@components/fleet-context';
import { Heartbeat } from '@components/heartbeat';

export function DevicesSection() {
  const { fleet } = useContext(FleetContext);
  return (
    <div className='flex flex-col'>
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
        <div className='w-full flex-1'>
          <div className='relative'>
            Your Devices
          </div>
        </div>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        <div
          className='flex flex-1 rounded-lg border border-dashed shadow-sm'
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[70px]'>Status</TableHead>
                <TableHead className='w-[200px]'>Name</TableHead>
                <TableHead className='w-[200px]'>OS</TableHead>
                <TableHead> Running capabilities</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {_.map(fleet, (device: Device) => (
                <TableRow key={device.id}>
                  <TableCell className='text-right'>
                    <div className='flex items-center gap-2'>
                      <span>
                        <Heartbeat
                          heartbeat={device.heartbeat}
                          refresh={true}
                        />
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      {device.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      {device.os}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2 flex-wrap'>
                      {_.map(device.capabilities, (capability: Capability) => {
                        if (capability?.route) {
                          return <Link 
                            key={device.id + capability.display_name}
                            className={badgeVariants()}
                            to={`/dashboard${capability.route}/${device.id}`}>
                              {capability.display_name}
                          </Link>
                        } else {
                          return <Badge variant="secondary" key={device.id + capability.display_name}>
                            {capability.display_name}
                          </Badge>
                        }
                      })
                    }
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