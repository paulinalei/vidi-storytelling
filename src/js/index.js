import Map from 'ol/Map';
import View from 'ol/View';
import {getCenter} from 'ol/extent';
import ImageLayer from 'ol/layer/Image';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic';

var extent = [0, 0, 2048, 1024];
var projection = new Projection({
  units: 'pixels',
  extent: extent
});

var map = new Map({
  layers: [
    new ImageLayer({
      source: new Static({
        url: '../src/img/map.png',
        projection: projection,
        imageExtent: extent
      })
    })
  ],
  target: 'map',
  view: new View({
    projection: projection,
    center: getCenter(extent),
    zoom: 2,
    maxZoom: 8
  })
});