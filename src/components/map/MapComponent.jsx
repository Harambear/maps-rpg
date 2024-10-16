import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import EncounterComponent from '../encounter/EncounterComponent';
import MarkerComponent from '../marker/MarkerComponent';
import PlaceComponent from '../place/PlaceComponent';
import balloons from '../../assets/icons/balloons.png';
import './MapComponent.scss';

export default function MapComponent({ player, setProfile }) {
  const [characterState, setCharacterState] = useState('idle');
  const [encounterObjectives, setEncounterObjectives] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [openPanorama, setOpenPanorama] = useState(null);
  const [panorama, setPanorama] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [position, setPosition] = useState(player.getLocation());

  useEffect(() => {
    player.setLocation(position);
    localStorage.setItem('profile', JSON.stringify(player));
  }, [position])

  function mapClickHandler(event) {
    const placeId = event.detail.placeId;

    if (placeId) {
      event.stop();
      setPlaceId(placeId);
    }
  }

  function objectiveClickHandler(event) {
    const filteredObjectives = encounterObjectives.filter((objective) => {
      return (
        objective.lat !== this.position.lat() ||
        objective.lng !== this.position.lng()
      )
    });

    // if no objectives are left
    if (!filteredObjectives.length) {
      // turn off panorama
      panorama.setVisible(false);

      // show text?
    }

    // give reward
    player.adjustCoins(10);
    console.log(player);
    return setEncounterObjectives(filteredObjectives);
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
          onClick={mapClickHandler}
          backgroundColor={'black'}
        >
          {
            encounterObjectives.length ?
              encounterObjectives.map((objective, index) => {
                return (
                  <Marker
                    key={index}
                    className='encounter__objective'
                    position={objective}
                    icon={balloons}
                    onClick={objectiveClickHandler}
                  />
                )
              }) :
              null
          }
          {
            (!!openPanorama) ?
              <EncounterComponent
                position={position}
                characterState={characterState}
                setOpenPanorama={setOpenPanorama}
                setEncounterObjectives={setEncounterObjectives}
                setPanorama={setPanorama} /> :
              null
          }
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
              setPlaceId={setPlaceId}
              setOpenPanorama={setOpenPanorama} />
          }
        </Map>
      </APIProvider>
    </section>
  );
}