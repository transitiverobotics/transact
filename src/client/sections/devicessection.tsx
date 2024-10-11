import React from "react";
import { my_fake_devices } from "../models/device";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"

export function DevicesSection() {
    return (
        <div className="flex flex-wrap gap-4">
            {my_fake_devices.map((device, i) => (
            <Card key={`${device}-${i}`} className="flex flex-col justify-between min-w-[200px] max-w-[300px]">
                <CardHeader>
                    <CardTitle>{device.name}</CardTitle>
                </CardHeader>
                <CardContent className="">
                    <CardDescription className="">
                        <img src={device.type.icon_svg} alt={device.name} className="max-h-full max-w-full"/>
                    </CardDescription>
                </CardContent>
                <CardFooter className="">
                <p>{device.description}</p>
                </CardFooter>
            </Card>)
            )}
        </div>
    );
}