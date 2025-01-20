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
  displayName: string;
  route: string | null;
  section: React.ComponentType | null;
  icon: React.ComponentType | null;

  constructor({id, displayName, route, section, icon}:
    { id: string, displayName: string, route: string | null,
      section: React.ComponentType | null, icon: React.ComponentType | null
    }) {
    this.id = id;
    this.displayName = displayName;
    this.route = route;
    this.section = section;
    this.icon = icon;
  }
}

export const capabilities = {
  'webrtc-video': new Capability({
    id: 'webrtc-video',
    displayName: 'Video',
    route: '/video',
    section: VideoSection,
    icon: Video
  }),
  'remote-teleop': new Capability({
    id: 'remote-teleop',
    displayName: 'Teleoperation',
    route: '/teleoperation',
    section: TeleopSection,
    icon: Joystick
  }),
  terminal: new Capability({
    id: 'terminal',
    displayName: 'Terminal',
    route: '/terminal',
    section: TerminalSection,
    icon: Terminal
  }),
  'health-monitoring': new Capability({
    id: 'health-monitoring',
    displayName: 'Health',
    route: '/health',
    section: HealthSection,
    icon: HeartPulse
  }),
  'configuration-management': new Capability({
    id: 'configuration-management',
    displayName: 'Configuration',
    route: '/configuration',
    section: ConfigSection,
    icon: SlidersHorizontal
  })
}

export class Device {
  id: string;
  name: string;
  os: string;
  type: DeviceType;
  heartbeat: Date;
  capabilities: Capability[];
  constructor(id: string, name: string, os: string, heartbeat: Date,
    capabilities: Capability[] = [], type: DeviceType) {

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