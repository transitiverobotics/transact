import React, { useState, useEffect } from "react";
import DeviceSelector from "../components/deviceselector";

const host = import.meta.env.VITE_HOST; // Transitive deployment
const ssl = !import.meta.env.VITE_INSECURE;

export function TeleopSection() {

  const [jwt, setJwt] = useState();
  const [device, setDevice] = useState();

  useEffect(() => {
      const getToken = async () => {
        const result = await fetch('/api/getJWT', {
          method: 'post',
          body: JSON.stringify({
            device,
            capability: "@transitive-robotics/remote-teleop",
          }),
          headers: { 'content-type': 'application/json' }
        });
        const json = await result.json();
        setJwt(json.token);
      }

      device && getToken();
    }, [device]);


  return (
    <div className="">
      <DeviceSelector onChange={setDevice}/>
      {device}

      {false && jwt && <TransitiveCapability jwt={jwt}
          host={host}
          ssl={ssl}
          control_rosVersion="1"
          control_topic="/joy"
          control_type="sensor_msgs/Joy"
          count="1"
          quantizer="25"
          timeout="1800"
          type="videotestsrc" />
      }

    </div>
  );
}