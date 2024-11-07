import React, { useContext, useEffect, useState } from "react";
import { CapabilityContext, getLogger} from '@transitive-sdk/utils-web';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"
import { Bot } from "lucide-react";
import L from 'leaflet';

const botSvg = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTIyLjg4IDEwNS4yMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIyLjg4IDEwNS4yMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO308L3N0eWxlPjxnPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02My45MSwxOC43NXYxMi4xNmgzMy41MWM1LjQzLDAsOS44Nyw0LjQ0LDkuODcsOS44N3YxMi40N2gxMy40MmMxLjE5LDAsMi4xNywwLjk3LDIuMTcsMi4xN3YyNS4yOCBjMCwxLjE5LTAuOTcsMi4xNy0yLjE3LDIuMTdoLTEzLjQydjEyLjQ3YzAsNS40My00LjQ0LDkuODctOS44Nyw5Ljg3aC03M2MtNS40MywwLTkuODctNC40NC05Ljg3LTkuODdWODIuODdIMi4xNyBDMC45Nyw4Mi44NywwLDgxLjksMCw4MC43MVY1NS40MmMwLTEuMTksMC45Ny0yLjE3LDIuMTctMi4xN2gxMi4zOFY0MC43OWMwLTUuNDMsNC40NC05Ljg3LDkuODctOS44N2gzMy41MVYxOC43NSBjLTMuODUtMS4yNi02LjYyLTQuODctNi42Mi05LjE0YzAtNS4zMSw0LjMtOS42MSw5LjYxLTkuNjFjNS4zMSwwLDkuNjEsNC4zLDkuNjEsOS42MUM3MC41MywxMy44OCw2Ny43NSwxNy40OSw2My45MSwxOC43NSBMNjMuOTEsMTguNzV6IE00MS4wMyw3OS43NGg0MC44MWMxLjk5LDAsMy42MiwxLjYzLDMuNjIsMy42MnYxLjdjMCwxLjk5LTEuNjMsMy42Mi0zLjYyLDMuNjJINDEuMDNjLTEuOTksMC0zLjYyLTEuNjMtMy42Mi0zLjYyIHYtMS43QzM3LjQxLDgxLjM2LDM5LjA0LDc5Ljc0LDQxLjAzLDc5Ljc0TDQxLjAzLDc5Ljc0eiBNNzguNyw0Ny41OWM1LjM3LDAsOS43Myw0LjM1LDkuNzMsOS43M2MwLDUuMzctNC4zNSw5LjcyLTkuNzMsOS43MiBzLTkuNzItNC4zNS05LjcyLTkuNzJDNjguOTcsNTEuOTQsNzMuMzMsNDcuNTksNzguNyw0Ny41OUw3OC43LDQ3LjU5eiBNNDQuMTgsNDcuNTljNS4zNywwLDkuNzIsNC4zNSw5LjcyLDkuNzMgYzAsNS4zNy00LjM1LDkuNzItOS43Miw5LjcyYy01LjM3LDAtOS43Mi00LjM1LTkuNzItOS43MkMzNC40Niw1MS45NCwzOC44MSw0Ny41OSw0NC4xOCw0Ny41OUw0NC4xOCw0Ny41OXoiLz48L2c+PC9zdmc+';
const botIcon = new L.Icon({
    iconUrl: botSvg,
    iconRetinaUrl: botSvg,
    popupAnchor:  [-0, -0],
    iconSize: [45,52],     
});

const coffeeUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvZmZlZSI+PHBhdGggZD0iTTEwIDJ2MiIvPjxwYXRoIGQ9Ik0xNCAydjIiLz48cGF0aCBkPSJNMTYgOGExIDEgMCAwIDEgMSAxdjhhNCA0IDAgMCAxLTQgNEg3YTQgNCAwIDAgMS00LTRWOWExIDEgMCAwIDEgMS0xaDE0YTQgNCAwIDEgMSAwIDhoLTEiLz48cGF0aCBkPSJNNiAydjIiLz48L3N2Zz4=';
const coffeeIcon = new L.Icon({
    iconUrl: coffeeUrl,
    iconRetinaUrl: coffeeUrl,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});

const plugUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBsdWciPjxwYXRoIGQ9Ik0xMiAyMnYtNSIvPjxwYXRoIGQ9Ik05IDhWMiIvPjxwYXRoIGQ9Ik0xNSA4VjIiLz48cGF0aCBkPSJNMTggOHY1YTQgNCAwIDAgMS00IDRoLTRhNCA0IDAgMCAxLTQtNFY4WiIvPjwvc3ZnPg==';
const plugIcon = new L.Icon({
    iconUrl: plugUrl,
    iconRetinaUrl: plugUrl,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});

const log = getLogger('MapComponent');
log.setLevel('debug');



export const MapComponent = ({deviceId}) => {
  const capabilityContext = useContext(CapabilityContext);
  const [api, setApi] = useState();

  useEffect(() => {
    if (!capabilityContext.ready) {
      return;
    }
    const _api = capabilityContext.getAPI(deviceId);
    log.debug('Subscribing to topic: /gps/fix', deviceId);
    _api?.subscribe(1, '/gps/fix');
    // unsubscribe when React component unmounts
    setApi(_api);
    return () => {
      log.debug('Unsubscribing from topic: /gps/fix for device', deviceId);
      _api?.unsubscribe?.(1, '/gps/fix');
    }
  }, [capabilityContext?.ready]);

  const gpsData = api?.deviceData?.ros?.[1].messages?.gps?.fix;
  if (!gpsData?.latitude || !gpsData?.longitude) {
    return <div>Loading Map</div>;
  }

  return (
    <MapContainer center={[gpsData.latitude, gpsData.longitude]} zoom={16} className='w-full h-full'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={[37.451889, -122.176823]}
        icon={plugIcon}
      >      
        <Popup>
          Dock
        </Popup>
      </Marker>
      <Marker 
        position={[37.454392, -122.1826635]}
        icon={coffeeIcon}
      >
        <Popup>
          Philz Coffee
        </Popup>
      </Marker>
      <ReactLeafletDriftMarker
        // if position changes, marker will drift its way to new position
        position={[gpsData.latitude, gpsData.longitude]}
        // time in ms that marker will take to reach its destination
        duration={1000}
        icon={botIcon}
      >
        <Popup>
          Latitude: {gpsData.latitude}<br />
          Longitude: {gpsData.longitude}<br />
        </Popup>
      </ReactLeafletDriftMarker>
    </MapContainer>
  );
}