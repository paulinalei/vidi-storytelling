import Graticule from 'ol/Graticule';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import OSM from 'ol/source/OSM';
import Stroke from 'ol/style/Stroke';

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM({
        wrapX: false
      })
    })
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([-123.0, 37.5]),
    zoom: 6
  })
});

var graticule = new Graticule({
  strokeStyle: new Stroke({
    color: 'rgba(0,0,0,1)',
    width: 2
  }),
  showLabels: true,
  intervals: [1, 0.5, 0.25, 0.125]
});

graticule.setMap(map);