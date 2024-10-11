import React from "react";
import { my_fake_devices } from "../models/device";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../components/ui/table";

export function DevicesSection() {
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
            {my_fake_devices.map((device) => (
            <TableRow key={device.name}>
                <TableCell>
                <div className="flex items-center gap-2">
                    <img src={device.type.icon_svg} className="h-6" alt={device.type.name} />
                    {device.name}
                </div>
                </TableCell>
                <TableCell>{device.description}</TableCell>
                <TableCell className="text-right">{device.battery_level}%</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    );
}