import React, { useState} from "react";
import DeviceSelector from "../components/deviceselector";
import { JWTCapability } from "../components/jwtcapability";

export function HealthSection() {
  const [device, setDevice] = useState();

  return (
    <div className="">
        <DeviceSelector onChange={setDevice}/>
        {device}
        <JWTCapability device={device} capability={"@transitive-robotics/health-monitoring"} delimiters={"undefined"}></JWTCapability>
    </div>
  );
}