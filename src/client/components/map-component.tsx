import React, { useContext, useEffect, useState } from "react";
import { CapabilityContext, getLogger} from '@transitive-sdk/utils-web';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

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
  log.debug('gpsData', gpsData);


  return (
    <MapContainer center={[gpsData.latitude, gpsData.longitude]} zoom={13} className='w-full h-full'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[gpsData.latitude, gpsData.longitude]}>
        <Popup>
          Latitude: {gpsData.latitude}<br />
          Longitude: {gpsData.longitude}<br />
        </Popup>
      </Marker>
    </MapContainer>
  );
}