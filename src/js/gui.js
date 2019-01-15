import * as constants from './constants';
import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';
import {legendColor, legendSize} from 'd3-svg-legend';
import maypop2011 from '../../data-processing/population-data/maypop2011.json';

var gui = {
	drawTL : function() {
		var tempColorLegend = legendColor()
		  .labelFormat(d3.format(".2f"))
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
		Object.keys(maypop2011[0]).forEach(function (key) {
			if (key != "lat" && key != "lon") {
				popKeys.push(key);
			}
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
			.attr("width", 10)
			.attr("height", 10)
			.style("fill", function(d, i) {
				return constants.POP_CS(d);
			});

		popLegend.append("text")
			.attr("x", 10)
			.attr("y", 10)
			.text(function(d, i) {
				return d;
			})
				.attr("class", "textselected")
				.style("text-anchor", "start")
				.style("font-size", 8);
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