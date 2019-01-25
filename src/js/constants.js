import * as d3 from 'd3';
import data from './libs/data.json';

//bugged to hell for date updates
var N = 200;
export const SIZE = Math.sqrt(data.length);
var CELLWIDTH = N/SIZE;
var CELLHEIGHT = N/SIZE;


export function getWidth(){return N;}
export function getHeight(){return N;}
export function getSize(){return SIZE;}
export function getCellWidth(){return CELLWIDTH;}
export function getCellHeight(){return CELLHEIGHT;}

var steps = 5, speciesNum = 18;
var tempColors = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];
export const TEMP_CS = d3.scaleQuantile()
  .domain([20, 10])
  .range(tempColors.reverse());
// var speciesNum = 11;
// export const POP_CS = d3.scaleOrdinal(d3.schemeSpectral[speciesNum]);
var color =['#e41a1c','#a9a9a9','#42d4f4','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'];
export const POP_CS = d3.scaleOrdinal(color);
export const CHLORO_CS = d3.scaleSequential(d3['interpolateGreens']).domain([30,0.03]);