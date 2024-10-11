export class DeviceType {
    name: string;
    description: string;
    icon_svg: string;
    constructor(name: string, description: string, icon_svg: string) {
        this.name = name;
        this.description = description;
        this.icon_svg = icon_svg;
    }
}

export class Robot extends DeviceType {
    constructor() {
        super("Robot", "A robot that can move around", "/src/client/assets/logo.svg");
    }
}

export class Device {
    name: string;
    description: string;
    type: DeviceType;
    constructor(name: string, description: string, type: DeviceType) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
}

export const my_fake_devices = [
    new Device("R2-D2", "Astromech droid from Star Wars", new Robot()),
    new Device("C-3PO", "Protocol droid from Star Wars", new Robot()),
    new Device("WALL-E", "Waste allocation robot from WALL-E", new Robot()),
    new Device("Optimus Prime", "Leader of the Autobots from Transformers", new Robot()),
    new Device("HAL 9000", "AI from 2001: A Space Odyssey", new Robot()),
];

export default {
    DeviceType,
    Robot,
    Device,
    my_fake_devices,
}