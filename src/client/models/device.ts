import { HeartPulse, Joystick, SlidersHorizontal, Terminal, Video, MapPinned }
  from 'lucide-react';

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
  icon: React.ComponentType | null;
  props?: Record<string, any>; // Props to be passed to TransitiveCapability
};

export const capabilities: Capability[] = {
  'maps': {
    id: 'maps',
    displayName: 'Map',
    route: '/map',
    icon: MapPinned
  },
  'webrtc-video': {
    id: 'webrtc-video',
    displayName: 'Video',
    route: '/video',
    icon: Video,
    props: { count: '1', quantizer: '25', timeout: '1800', type: 'videotestsrc' }
  },
  'remote-teleop': {
    id: 'remote-teleop',
    displayName: 'Teleoperation',
    route: '/teleoperation',
    icon: Joystick,
    props: {
      control_rosVersion: '1',
      control_topic: '/joy',
      control_type: 'sensor_msgs/Joy',
      count: '1',
      quantizer: '25',
      timeout: '1800',
      type: 'videotestsrc',
    }
  },
  terminal: {
    id: 'terminal',
    displayName: 'Terminal',
    route: '/terminal',
    icon: Terminal
  },
  'health-monitoring': {
    id: 'health-monitoring',
    displayName: 'Health',
    route: '/health',
    icon: HeartPulse,
    props: {delimiters: 'undefined'}
  },
  'configuration-management': {
    id: 'configuration-management',
    displayName: 'Configuration',
    route: '/configuration',
    icon: SlidersHorizontal
  }
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
  Device
}