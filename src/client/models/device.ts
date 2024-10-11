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
    battery_level: number = 100;
    constructor(name: string, description: string, type: DeviceType, battery_level: number = 100) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.battery_level = battery_level;
    }
}

export const my_fake_devices = [
    new Device("R2-D2", "Astromech droid from Star Wars", new Robot(), 80),
    new Device("C-3PO", "Protocol droid from Star Wars", new Robot(), 90),
    new Device("WALL-E", "Waste allocation robot from WALL-E", new Robot(), 70),
    new Device("Optimus Prime", "Leader of the Autobots from Transformers", new Robot(), 85),
    new Device("HAL 9000", "AI from 2001: A Space Odyssey", new Robot(), 95),
];

export default {
    DeviceType,
    Robot,
    Device,
    my_fake_devices,
}