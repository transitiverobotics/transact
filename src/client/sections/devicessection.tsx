import React, { useContext } from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui/table";

import { FleetContext } from '../components/fleetContext';
import _ from "lodash";

export function DevicesSection() {
    const { fleet } = useContext(FleetContext);
    return (
        <Table>
        <TableCaption>Your devices</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Battery</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {_.map(fleet, (device, key) => (
            <TableRow key={key}>
                <TableCell>
                <div className="flex items-center gap-2">
                    {key}
                </div>
                </TableCell>
                <TableCell>no description yet</TableCell>
                <TableCell className="text-right">100%</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    );
}