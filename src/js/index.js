import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import Stamen from 'ol/source/Stamen';

var map = new Map({
  layers: [
    new TileLayer({
      source: new Stamen({
        layer: 'watercolor'
      })
    })
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([-123.0, 37.5]),
    zoom: 8
  })
});

document.getElementById('export-png').addEventListener('click', function() {
  map.once('rendercomplete', function(event) {
    var canvas = event.context.canvas;
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
    } else {
      canvas.toBlob(function(blob) {
        saveAs(blob, 'map.png');
      });
    }
  });
  map.renderSync();
});