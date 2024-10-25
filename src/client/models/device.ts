import { HeartPulse, Joystick, SlidersHorizontal, Terminal, Video } from 'lucide-react';

import { VideoSection } from '@sections/video-section';
import { TerminalSection } from '@sections/terminal-section';
import { HealthSection } from '@sections/health-section';
import { ConfigSection } from '@sections/config-section';
import { TeleopSection } from '@sections/teleop-section';


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

export class Capability {
    id: string;
    display_name: string;
    route: string | null;
    section: React.ComponentType | null;
    icon: React.ComponentType | null;

    constructor(id: string, display_name: string, route: string | null, section: React.ComponentType | null, icon: React.ComponentType | null) {
        this.id = id;
        this.display_name = display_name;
        this.route = route;
        this.section = section;
        this.icon = icon;
    }
}

export const capabilities = {
    'remote-teleop': new Capability(
        'remote-teleop',
        'teleoperation',
        '/teleoperation',
        TeleopSection,
        Joystick
    ),
    'webrtc-video': new Capability(
        'webrtc-video',
        'video',
        '/video',
        VideoSection,
        Video
    ),
    terminal: new Capability(
        'terminal',
        'terminal',
        '/terminal',
        TerminalSection,
        Terminal
    ),
    'health-monitoring': new Capability(
        'health-monitoring',
        'health',
        '/health',
        HealthSection,
        HeartPulse
    ),
    'configuration-management': new Capability(
        'configuration-management',
        'configuration',
        '/configuration',
        ConfigSection,
        SlidersHorizontal
    ),
    'file-sync': new Capability(
        'file-sync',
        'file',
        null,
        null,
        null
    ),
}

export class Device {
    id: string;
    name: string;
    os: string;
    type: DeviceType;
    heartbeat: Date;
    capabilities: Capability[];
    constructor(id: string, name: string, os: string, heartbeat: Date, capabilities: Capability[] = [], type: DeviceType) {
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