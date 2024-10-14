import { useEffect, useRef, useState } from 'react'
import MapComponent from './components/map/MapComponent'
import { locations } from './data/locations';
import Player from './models/Player';

import './App.scss'

export default function App() {
  const [savedProfile, setSavedProfile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [startingPosition, setStartingPosition] = useState(null);
  const [inputClass, setInputClass] = useState('menu__option__input menu__option__input--text');

  const nameRef = useRef(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        // user accepts
        (position) => {
          setStartingPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      );
    }

    const localProfile = JSON.parse(localStorage.getItem('profile'));

    if (localProfile) {
      const player = new Player(localProfile);
      setSavedProfile(player);
    }
  }, []);

  function startNewProfile(coordinates) {
    return function (event) {
      // if no name, stop function and throw warning
      if (!nameRef.current.value) {
        setInputClass(`${inputClass} menu__option__input--text--error`);
        return;
      }

      const newProfile = new Player({ name: nameRef.current.value, location: coordinates });
      setProfile(newProfile);

      localStorage.setItem('profile', JSON.stringify(newProfile));
    }
  }

  return (
    <section className='app'>
      {
        !profile ?
          <div className='menu'>
            {
              savedProfile ?
                <div className='menu__option-container'>
                  <div
                    className='menu__option'
                    onClick={() => { setProfile(savedProfile) }}>
                    Continue?
                  </div>
                </div> :
                null
            }
            <div className='menu__option-container'>
              <div className='menu__option-container__title'>New Game</div>
              <input className={inputClass} type='text' placeholder='Player Name' spellCheck={false} ref={nameRef} />

              {
                startingPosition ?
                  <div
                    className='menu__option'
                    onClick={startNewProfile(startingPosition)}>
                    Current Location
                  </div> :
                  null
              }
              {
                locations.map((location, index) => {
                  return (
                    <div
                      className='menu__option'
                      key={index}
                      onClick={startNewProfile(location.coordinates)}
                    >
                      {location.name}
                    </div>
                  )
                })
              }
            </div>
          </div> :
          <MapComponent
            player={profile}
            setProfile={setProfile}
          />
      }
    </section >
  )
}