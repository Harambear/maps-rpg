import React, { useState, useEffect } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import MarkerComponent from '../marker/MarkerComponent';
import PlaceComponent from '../place/PlaceComponent';

import './MapComponent.scss';

export default function MapComponent({ player, setProfile }) {
  const [position, setPosition] = useState(player.getLocation());
  const [coordinates, setCoordinates] = useState(null);
  const [characterState, setCharacterState] = useState('idle');
  const [placeId, setPlaceId] = useState();

  useEffect(() => {
    player.setLocation(position);
    localStorage.setItem('profile', JSON.stringify(player));
  }, [position])

  function clickHandler(event) {
    event.stop();

    const placeId = event.detail.placeId;

    if (placeId) {
      event.stop();
      setPlaceId(placeId);
    }
  }

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <section className='map'>
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
          backgroundColor={'black'}
        >
          {
            (!!placeId) ?
              <PlaceComponent
                placeId={placeId}
                characterState={characterState}
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
    </section>
  );
}