import { useEffect, useState } from 'react';
import { InfoWindow, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

import './PlaceComponent.scss';

export default function PlaceComponent(prop) {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const routesLib = useMapsLibrary('routes');
  const [infoWindow, setInfoWindow] = useState(null);

  function moveClickHandler(destination) {
    return function (event) {
      if (prop.characterState != 'idle') {
        return;
      }

      prop.setCharacterState('walk');

      const service = new routesLib.DirectionsService();
      const request = {
        origin: prop.position,
        destination: destination,
        travelMode: 'WALKING'
      };

      service.route(request, (result, status) => {
        if (status !== 'OK') {
          return;
        }

        const directionsData = result.routes[0].legs[0];
        const steps = [];

        let count = 0;
        for (var i = 0; i < directionsData.steps.length; i++) {
          const step = directionsData.steps[i];

          step.path.forEach((path) => {
            steps[count] = {};
            steps[count]['lat'] = path.lat();
            steps[count]['lng'] = path.lng();

            count++;
          });
        }

        prop.setCoordinates(steps);
      });
    }
  }

  useEffect(() => {
    if (!placesLib || !map) {
      return;
    }

    const service = new placesLib.PlacesService(map);
    const request = {
      placeId: prop.placeId,
      fields: [
        'name',
        'place_id',
        'geometry',
        'photo',
        'types'
      ],
    };

    service.getDetails(request, (place, status) => {
      if (status !== 'OK') {
        return;
      }

      const latitude = place?.geometry?.location?.lat();
      const longitude = place?.geometry?.location?.lng();

      const window = (
        <InfoWindow
          headerContent={place.name}
          position={{
            lat: place?.geometry?.location?.lat(),
            lng: place?.geometry?.location?.lng(),
          }}
          style={{
            maxWidth: '350px',
          }}
          onCloseClick={() => setInfoWindow(null)}
          pixelOffset={[0, -50]}
        >
          <div className='place'>
            <img
              className='place__image'
              src={
                place?.photos ?
                  place?.photos[0].getUrl() :
                  'https://placehold.co/300'
              }
            />
            <button
              className='place__option'
              onClick={moveClickHandler({
                lat: latitude,
                lng: longitude
              })}>
            </button>
          </div>
        </InfoWindow>
      );

      setInfoWindow(window);
    })
  }, [prop.placeId, placesLib, map]);

  return (
    <>
      {infoWindow ? infoWindow : null}
    </>
  );
}