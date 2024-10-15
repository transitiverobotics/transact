import React, { useState} from "react";
import DeviceSelector from "../components/deviceselector";
import { JWTCapability } from "../components/jwtcapability";

export function TeleopSection() {
  const [device, setDevice] = useState();

  return (
    <div className="">
      <DeviceSelector onChange={setDevice}/>
      {device}
      {device && <JWTCapability
          device={device}
          capability={"@transitive-robotics/remote-teleop"}
          control_rosVersion="1"
          control_topic="/joy"
          control_type="sensor_msgs/Joy"
          count="1"
          quantizer="25"
          timeout="1800"
          type="videotestsrc"
          />
      }
    </div>
  );
}