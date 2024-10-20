import React, { useState} from "react";
import DeviceSelector from "../components/device-selector";
import { JWTCapability } from "../components/jwt-capability";
import { getLogger} from '@transitive-sdk/utils-web';

const log = getLogger('TerminalSection');
log.setLevel('debug');

export function TerminalSection() {
  const [device, setDevice] = useState();

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <div className="w-full flex-1">
          <div className="relative">
            <DeviceSelector onChange={setDevice}/>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        >
          {device && <JWTCapability device={device} capability={"@transitive-robotics/terminal"}/>}
        </div>
      </main>
    </div>
  );
}