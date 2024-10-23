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

export const Robot = new DeviceType(
    'Robot',
    'A robot that can move around',
    '/src/client/assets/logo.svg'
);

export class Device {
    id: string;
    name: string;
    os: string;
    type: DeviceType;
    heartbeat: Date;
    capabilities: string[];
    constructor(id: string, name: string, os: string, heartbeat: Date, capabilities: string[] = [], type: DeviceType) {
        this.id = id;
        this.name = name;
        this.os = os;
        this.heartbeat = heartbeat;
        this.capabilities = capabilities;
        this.type = type;
    }
}

export default {
    DeviceType,
    Robot,
    Device,
}