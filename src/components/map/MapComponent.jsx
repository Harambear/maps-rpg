import React, { useState, useEffect } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import MarkerComponent from '../marker/MarkerComponent';
import PlaceComponent from '../place/PlaceComponent';

import './MapComponent.scss';

export default function MapComponent() {
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [coordinates, setCoordinates] = useState(null);
  const [characterState, setCharacterState] = useState('idle');
  const [placeId, setPlaceId] = useState();

  function clickHandler(event) {
    event.stop();

    const placeId = event.detail.placeId;

    if (placeId) {
      event.stop();
      setPlaceId(placeId);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setPosition({
            //Waikiki
            lat: 21.280693,
            lng: -157.834549
          });
        }
      );
    }
  }, []);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <section className='map'>
      {position.lat && position.lng ? (
        <APIProvider apiKey={googleMapsApiKey}>
          <Map
            mapId='d139bd7ef26a4ea3'
            style={{ width: '100svw', height: '100svh' }}
            defaultCenter={position}
            defaultZoom={17}
            disableDefaultUI={true}
            disableDoubleClickZoom={true}
            scrollwheel={false}
            keyboardShortcuts={false}
            onClick={clickHandler}
          >
            {
              (!!placeId) ?
                <PlaceComponent
                  placeId={placeId}
                  setCharacterState={setCharacterState}
                  setCoordinates={setCoordinates}
                  position={position} /> :
                null
            }
            {
              <MarkerComponent
                location={position}
                characterState={characterState}
                setCharacterState={setCharacterState}
                coordinates={coordinates}
                setPosition={setPosition}
                setPlaceId={setPlaceId} />
            }
          </Map>
        </APIProvider>
      ) : (
        <p>Please enable geolocation to continue...</p>
      )}
    </section>
  );
}