import { useMap } from "@vis.gl/react-google-maps";
import './EncounterComponent.scss';
import { useEffect, useState } from "react";

export default function EncounterComponent({
  position,
  characterState,
  setOpenPanorama,
  setPanorama,
  setEncounterObjectives
}) {
  const [close, setClose] = useState(false);
  const map = useMap();
  const panorama = map.getStreetView();

  useEffect(() => {
    setClose(false);
    setPanorama(panorama);
  }, [position])

  panorama.setOptions({
    linksControl: false,
    panControl: true,
    enableCloseButton: false,
    scrollwheel: false,
    disableDefaultUI: true,
    clickToGo: false
  });

  panorama.setPosition(position);

  function startQuest(event) {
    setOpenPanorama(false);

    setEncounterObjectives(generateRandomPoints(position, 50, 1));

    panorama.setVisible(true);
  }

  return (
    (characterState === 'idle' && !close) ?
      <section className="encounter">
        <div className="encounter__title">
          Find the balloon!
        </div>

        <div className="encounter__text">
          I've hidden a balloon in the area! Find it and you'll earn some coins!
        </div>

        <div className="encounter__option-container">
          <button className="encounter__option encounter__option--accept" onClick={startQuest}>✓</button>
          <button className="encounter__option encounter__option--decline" onClick={() => { setClose(true) }}>&#10006;</button>
        </div>
      </section> :
      null
  );
}

/**
* Generates number of random geolocation points given a center and a radius.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @param {number} count Number of points to generate.
* @return {array} Array of Objects with lat and lng attributes.
*/
function generateRandomPoints(center, radius, count) {
  var points = [];
  for (var i = 0; i < count; i++) {
    points.push(generateRandomPoint(center, radius));
  }
  return points;
}
/**
* Generates number of random geolocation points given a center and a radius.
* Reference URL: http://goo.gl/KWcPE.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @return {Object} The generated random points as JS object with lat and lng attributes.
*/
function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x / Math.cos(y0);

  // Resulting point.
  return { 'lat': y + y0, 'lng': xp + x0 };
}
