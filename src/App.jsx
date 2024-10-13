import { useState } from 'react'
import MapComponent from './components/map/MapComponent'
import './App.scss'

function App() {
  // check if there is an existing profile
  // MapComponent should accept profile
  // profiles should contain location data
  // lack of profile as prop can trigger new instantiation with current location and / or default location / s

  return (
    <section className="app">
      <MapComponent />
    </section>
  )
}

export default App
