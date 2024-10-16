import { useEffect } from "react";
import { AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import attack from '../../assets/spritesheet/cat/attack.png';
import death from '../../assets/spritesheet/cat/death.png';
import hurt from '../../assets/spritesheet/cat/hurt.png';
import idle from '../../assets/spritesheet/cat/idle.png';
import walk from '../../assets/spritesheet/cat/walk.png';
import './MarkerComponent.scss';

export default function MarkerComponent(prop) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    if (prop.coordinates) {
      async function moveMarker(marker) {
        for (let i = 0; i < prop.coordinates.length; i++) {
          const coordinate = prop.coordinates[i];
          marker.position = coordinate;
          await sleep(200);
        }

        prop.setPosition(marker.position);
        prop.setPlaceId(null);
        prop.setCharacterState('idle');
        prop.setOpenPanorama('true');
      }

      moveMarker(marker);
    }
  }, [prop.coordinates]);

  return (
    <AdvancedMarker
      ref={markerRef}
      position={prop.location}
      title={'Character Marker'}
    >
      <div className="character">
        {renderCharacter(prop.characterState)}
      </div>
    </AdvancedMarker>
  )
}

function renderCharacter(characterState) {
  let
    className = 'character__sprite character__sprite',
    src = '';

  if (characterState === 'attack') {
    className += '--4-panel';
    src = attack;
  }

  if (characterState === 'death') {
    className += '--4-panel';
    src = death;
  }

  if (characterState === 'hurt') {
    className += '--2-panel';
    src = hurt;
  }

  if (characterState === 'idle') {
    className += '--4-panel';
    src = idle;
  }

  if (characterState === 'walk') {
    className += '--6-panel';
    src = walk;
  }

  return (
    <img className={className} src={src} alt="Character" />
  )
}