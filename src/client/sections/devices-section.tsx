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


import { capabilities, Capability, Device } from '@models/device';
import { FleetContext } from '@components/fleet-context';
import { Heartbeat } from '@components/heartbeat';
import { CircleArrowRight } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger } from '@components/ui/accordion';
import { AccordionContent } from '@radix-ui/react-accordion';
import { JWTCapability } from '@components/jwt-capability';

export function DevicesSection() {
  const { fleet } = useContext(FleetContext);
  return (
    <>
      <header className='flex items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
      </header>
      <main className='grid grid-rows-[30px_auto_30px_auto] gap-2 lg:gap-4 lg:p-6 overflow-hidden p-4'>
        <div className='text-lg'>Your Devices</div>
        <div
          className='rounded-lg border border-dashed shadow-sm px-6 overflow-y-auto'
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[70px]'>Status</TableHead>
                <TableHead className='w-[200px]'>Name</TableHead>
                <TableHead className='w-[200px]'>OS</TableHead>
                <TableHead> Running capabilities</TableHead>
                <TableHead className='w-[30px]'></TableHead>
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
                  <TableCell>
                    <Link to={`/dashboard/devices/${device.id}`}>
                      <CircleArrowRight />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className='text-lg'>Fleet wide capability status</div>
        <div
          className='rounded-lg border border-dashed shadow-sm px-6 overflow-y-auto'
        >
          <Accordion type="single" collapsible className='w-full'>
            {_.map(capabilities, (capability: Capability, capabilityId: string) => (
              <AccordionItem key={capabilityId} value={capabilityId}>
                <AccordionTrigger>
                  <div className={'flex items-center gap-3 rounded-lg px-3 py-2 transition-all'}>
                    <capability.icon/>
                    <span className=''>{capability.display_name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <JWTCapability
                  device={'_fleet'}
                  capability={`@transitive-robotics/${capability.id}`}
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