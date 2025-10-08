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
import { capabilities } from '@config/config';
import { FleetContext } from '@components/fleet-context';
import { Heartbeat } from '@components/heartbeat';
import { Accordion, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import { AccordionContent } from '@radix-ui/react-accordion';
import { JWTCapability } from '@components/jwt-capability';
import { BatteryIcon } from '@components/battery-icon';
import { CityLabel } from '@components/city-label';

export function DevicesSection() {
  const { fleet } = useContext(FleetContext);
  return (
    <>
      <header className='flex items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      </header>
      <main className='grid grid-rows-[auto_auto] gap-2 lg:gap-4 lg:p-6 overflow-y-auto p-4'>
        <div
          className='rounded-lg border border-dashed shadow-sm px-6'
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[5em]'>Status</TableHead>
                <TableHead className='w-[5em]'>Battery</TableHead>
                <TableHead className='w-[10em]'>Name</TableHead>
                <TableHead className='w-[10em]'>Location</TableHead>
                <TableHead className='w-[10em]'>OS</TableHead>
                <TableHead>Running capabilities</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {_.map(fleet, (device: Device) => (
                <TableRow key={device.id}>
                  <TableCell className='text-right'>
                    <Heartbeat
                      heartbeat={device.heartbeat}
                      refresh={true}
                    />
                  </TableCell>
                  <TableCell>
                    <BatteryIcon deviceId={device.id} />
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/devices/${device.id}`}>
                      {device.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <CityLabel deviceId={device.id} />
                  </TableCell>
                  <TableCell>
                    {device.os}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2 flex-wrap'>
                      {_.map(device.capabilities, (capability: Capability) => {
                        if (capability?.route) {
                          return <Link
                            key={device.id + capability.displayName}
                            className={badgeVariants()}
                            to={`/dashboard${capability.route}/${device.id}`}>
                              {capability.displayName}
                          </Link>
                        } else {
                          return <Badge variant="secondary" key={device.id + capability.displayName}>
                            {capability.displayName}
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
        <div
          className='rounded-lg border border-dashed shadow-sm px-6'
        >
          <Accordion type="single" collapsible className='w-full'>
            {_.map(capabilities, (capability: Capability, capabilityKey: string) => (
              <AccordionItem key={capabilityKey} value={capabilityKey}>
                <AccordionTrigger>
                  <div className={'flex items-center gap-3 rounded-lg px-3 py-2 transition-all'}>
                    <capability.icon/>
                    <span className=''>{capability.displayName}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <JWTCapability
                  device={'_fleet'}
                  capability={capability.id}
                  {...capability.fleetProps}
                  />
                </AccordionContent>
              </AccordionItem>
            )
            )}
          </Accordion>
        </div>
      </main>
    </>
  );
}