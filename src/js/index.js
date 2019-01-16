import data from './libs/data.json';
import * as dat from 'dat.gui';
import * as constants from './constants';
import gui from './gui';
import scene from './render/scene'


// initialize and create fullscreen version
var matrixData = data;
gui.drawTL();
gui.drawPop();

var fullScreenConfig = {
	'containerID': 'container',
	'matrixData': matrixData,
	'height': constants.HEIGHT,
	'width': constants.WIDTH
}

var panel1Config = {
	'containerID': 'panel-1',
	'matrixData': matrixData,
	'height': constants.HEIGHT,
	'initialYear': 2011,
	'width': constants.WIDTH
}

var panel2Config = {
	'containerID': 'panel-2',
	'matrixData': matrixData,
	'height': constants.HEIGHT,
	'initialYear': 2015,
	'width': constants.WIDTH
}

scene.draw(panel1Config); 
scene.draw(panel2Config); 




/*   Functions   */



/*
  Showing monthly population
*/
// function drawPopulation(divid, filename) {
	// set the dimensions and margins of the graph
	// var margin = {top: 10, right: 10, bottom: 45, left: 60},
	// width = 500 - margin.left - margin.right,
	// height = 150 - margin.top - margin.bottom;
  
	// // parse the date / time
	// var parseTime = d3.timeParse("%m/%d/%Y");
  
	// // set the ranges
	// var x = d3.scaleTime().range([0, width]);
	// var y = d3.scaleLinear().range([height, 0]);
  
	// // define the line
	// var valueline = d3.line()
	// .x(function(d) { return x(d.date); })
	// .y(function(d) { return y(d.pop); });
  
	// // append the svg obgect to the body of the page
	// // appends a 'group' element to 'svg'
	// // moves the 'group' element to the top left margin
	// var svg = d3.select(divid).append("svg")
	// .attr("width", width + margin.left + margin.right)
	// .attr("height", height + margin.top + margin.bottom)
	// .append("g")
	// .attr("transform",
	// 	  "translate(" + margin.left + "," + margin.top + ")");
  
	// // Get the data
	// d3.csv(filename).then(function(data) {
	//   // format the data
	//   data.forEach(function(d) {
	// 	d.date = parseTime(d.date);
	// 	d.pop = +d.pop;
	//   });
  
	//   // Scale the range of the data
	//   x.domain(d3.extent(data, function(d) { return d.date; }));
	//   y.domain([0, d3.max(data, function(d) { return d.pop; })]);
  
	//   // Add the valueline path.
	//   svg.append("path")
	// 	.data([data])
	// 	.attr("class", "line")
	// 	.attr("d", valueline);
  
	//   // // Add the X Axis
	//   svg.append("g")
	// 	.attr("transform", "translate(0," + height + ")")
	// 	.call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m/%d/%y")))
	// 	.selectAll("text")
	//   		.style("font-size", "10px")
	// 		.style("text-anchor", "end")
	// 		.attr("dx", "-.8em")
	// 		.attr("dy", ".15em")
	// 		.attr("transform", "rotate(-55)");
	//   // Add the Y Axis
	//   svg.append("g")
	// 	.call(d3.axisLeft(y));
	// });
 //  }
  
  // drawPopulation("#population-1", "../../data-processing/population-data/maypop2011.csv");
  // drawPopulation("#population-2", "../../data-processing/population-data/maypop2015.csv");
