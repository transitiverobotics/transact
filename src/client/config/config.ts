import { HeartPulse, Joystick, SlidersHorizontal, Terminal, Video, MapPinned,
    Cctv, LockKeyhole }from 'lucide-react';

import { Capability } from '@models/device';

/**
 * Configure the Transitive capabilities you have installed on your fleet and
 * want to embed in your transAct dashboard.
 */
export const capabilities: Record<string, Capability> = {
  'maps': {
    id: '@transitive-robotics/maps',
    displayName: 'Map',
    route: '/map',
    icon: MapPinned,
    props: {
      enablerelocate: "true",
      laserscan_name: "/laser_scan",
      laserscan_rosType: "sensor_msgs/LaserScan",
      laserscan_rosVersion: "1",
      maplayer_0_color: "#000000",
      maplayer_0_rosType: "nav_msgs/OccupancyGrid",
      maplayer_0_rosVersion: "1",
      maplayer_0_topic: "/mapping/map",
      posesource_name: "/localization/pose",
      posesource_rosType: "geometry_msgs/Pose",
      posesource_rosVersion: "1",
      posesource_type: "rosTopic",
    },
    fleetProps: {
      // mapid: "first_floor", // leave commented out to show floor selector
      maplayer_0_color: "#000000",
      maplayer_0_name: "navigation",
      maplayer_1_color: "#ff0000",
      maplayer_1_name: "Access Map",
      maplayer_2_color: "#ebcb11",
      maplayer_2_name: "Speed Map",
      posesource_name: "/localization/pose",
      posesource_rosType: "geometry_msgs/Pose",
      posesource_rosVersion: "1",
      posesource_type: "rosTopic",
    }
  },
  'webrtc-video': {
    id: '@transitive-robotics/webrtc-video',
    displayName: 'Video',
    route: '/video',
    icon: Video,
    props: {
      count: '1',
      quantizer: '25',
      timeout: '1800',
      type: 'videotestsrc'
    }
  },
  'remote-teleop': {
    id: '@transitive-robotics/remote-teleop',
    displayName: 'Teleoperation',
    route: '/teleoperation',
    icon: Joystick,
    props: {
      control_rosVersion: '1',
      control_topic: '/joy',
      control_type: 'sensor_msgs/Joy',
      count: '2',
      quantizer: '25',
      timeout: '1800',
      type: 'videotestsrc',
      type_1:'videotestsrc',
    }
  },
  terminal: {
    id: '@transitive-robotics/terminal',
    displayName: 'Terminal',
    route: '/terminal',
    icon: Terminal
  },
  'health-monitoring': {
    id: '@transitive-robotics/health-monitoring',
    displayName: 'Health',
    route: '/health',
    icon: HeartPulse,
    props: {
      delimiters: 'undefined'
    }
  },
  'configuration-management':{
    id: '@transitive-robotics/configuration-management',
    displayName: 'Configuration',
    route: '/configuration',
    icon: SlidersHorizontal
  },
  'video-recorder': {
    id: '@transitive-robotics/video-recorder',
    displayName: 'Video Recorder',
    route: '/recorder',
    icon: Cctv,
    props: {
      // This shows the video player instead of the track configuration UI,
      // which is of course what you usually want in a dashboard
      component: 'video-recorder-player',
      // If the following are provided, then the calendar will not be shown and
      // instead the provided time-range will be selected and playered, i.e.,
      // only the actual video player will be shown with these videos preloaded.
      // trackId: 'bKtBkIYj',
      // start: "1748973000000",
      // end: "1748973600000",
    }
  },
  'robot-lock': {
    id: '@transitive-robotics/robot-lock',
    displayName: 'Robot Lock',
    route: '/lock',
    icon: LockKeyhole
  }
}
