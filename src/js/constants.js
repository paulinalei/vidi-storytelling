import * as d3 from 'd3';
import data from './libs/data.json';

export const WIDTH = 1000;
export const HEIGHT = 1000;
export const SIZE = Math.sqrt(data.length);

export const CELLWIDTH = WIDTH/SIZE;
export const CELLHEIGHT = HEIGHT/SIZE;

var steps = 5, speciesNum = 18;
export const TEMP_CS = d3.scaleQuantile()
  .domain([20, 10])
  .range(d3.schemeRdBu[steps].reverse());
// var speciesNum = 11;
// export const POP_CS = d3.scaleOrdinal(d3.schemeSpectral[speciesNum]);

export const POP_CS = d3.scaleOrdinal(d3.schemeSpectral[11]);
export const CHLORO_CS = d3.scaleSequential(d3['interpolatePlasma']).domain([0.03,30]);