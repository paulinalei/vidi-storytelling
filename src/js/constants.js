import * as d3 from 'd3';
import data from './libs/data.json';

//bugged to hell for date updates
var WIDTH = 1000;
var HEIGHT = 1000;

export const SIZE = Math.sqrt(data.length);
var CELLWIDTH = WIDTH/SIZE;
var CELLHEIGHT = HEIGHT/SIZE;


export function getWidth(){return WIDTH;}
export function getHeight(){return HEIGHT;}
export function getSize(){return SIZE;}
export function getCellWidth(){return CELLWIDTH;}
export function getCellHeight(){return CELLHEIGHT;}

export function setWidth(w){ WIDTH=w; CELLWIDTH = WIDTH/SIZE}
export function setHeight(h){ HEIGHT=h; CELLHEIGHT = HEIGHT/SIZE;}



var steps = 5, speciesNum = 18;
export const TEMP_CS = d3.scaleQuantile()
  .domain([20, 10])
  .range(d3.schemeRdBu[steps].reverse());
// var speciesNum = 11;
// export const POP_CS = d3.scaleOrdinal(d3.schemeSpectral[speciesNum]);

export const POP_CS = d3.scaleOrdinal(d3.schemeSpectral[11]);
export const CHLORO_CS = d3.scaleSequential(d3['interpolatePlasma']).domain([0.03,30]);