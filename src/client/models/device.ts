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
    id: string;
    name: string;
    description: string;
    type: DeviceType;
    battery_level: number = 100;
    constructor(id: string, name: string, description: string, type: DeviceType, battery_level: number = 100) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.battery_level = battery_level;
    }
}

export const my_fake_devices = [
    new Device("d_c09317e04e", "Robot1", "First local robot", new Robot(), 80),
];

export default {
    DeviceType,
    Robot,
    Device,
    my_fake_devices,
}