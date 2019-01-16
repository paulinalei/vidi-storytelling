import * as constants from './constants';
import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';
import {legendColor, legendSize} from 'd3-svg-legend';
import speciesClass from './libs/speciesClass.json';

var gui = {
	drawTL : function() {
		var tempColorLegend = legendColor()
		  .labelFormat(d3.format(".2f"))
		  .classPrefix('legend')
		  .scale(constants.TEMP_CS)
		  .shapePadding(0)
		  .shapeWidth(20)
		  .shapeHeight(20)
		  .labelOffset(10);

		var tempLegend = d3.select("#temp-legend")
		  .append("g")
		  .call(tempColorLegend); 
	},
	drawPop : function(){
		var popKeys = []
		Object.keys(speciesClass[1]).forEach(function (key) {
				popKeys.push(speciesClass[1][key]);
		 });

		var popLegendSize = d3.select("#pop-legend")
			.append("svg")

		var offset = 80;
		var popLegend = popLegendSize.selectAll("#pop-legend")
			.data(popKeys)
			.enter().append("g")
			.attr("class", "swatch")
			.attr("transform", function (d, i) {
				return "translate(0," + i*20 +")";
			});

		popLegend.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 20)
			.attr("height", 20)
			.style("stroke", "black")
			.style("fill", function(d, i) {
				return constants.POP_CS(d);
			});

		popLegend.append("text")
			.attr("x", 30)
			.attr("y", 15)
			.text(function(d, i) {
				return d;
			})
			.attr("class", "legendlabel")
			.style("text-anchor", "start")
	},
	drawChloro : function (){
		var chloroLegend;
	},
	drawSlider: function(){
		// slider
		var slider = sliderHorizontal()
		  .min(2009)
		  .max(2018)
		  .step(1)
		  .width(300)
		  .displayValue(false)
		  .tickFormat(d3.format(''))
		  .on('onchange', val => {
		    updateCells(val);
		  });

		var group = d3.select("#slider")
		  .append("svg")
		  .attr("width", 700)
		  .attr("height", 100)
		  .append("g")
		  .attr("transform", "translate(350,30)")
		  .call(slider);
	}
}

export default gui;

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
