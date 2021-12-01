import Leaflet from 'leaflet';

import local from '../images/local.svg';

const mapIcon = Leaflet.icon({
    iconUrl: local,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })

  export default mapIcon;