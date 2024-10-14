import React, { useState} from "react";
import DeviceSelector from "../components/deviceselector";
import { JWTCapability } from "../components/jwtcapability";

export function VideoSection() {
  const [device, setDevice] = useState();

  return (
    <div className="">
        <DeviceSelector onChange={setDevice}/>
        {device}
        <JWTCapability 
            device={device}
            capability={"@transitive-robotics/webrtc-video"}
            count="1"
            quantizer="25"
            timeout="1800"
            type="videotestsrc">   
        </JWTCapability>
    </div>
  );
}