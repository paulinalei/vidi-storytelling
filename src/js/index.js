import THREE from 'three';
import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';
import {legendColor, legendSize} from 'd3-svg-legend';
import data from './libs/data.json';
import maypop2011 from '../../data-processing/population-data/maypop2011.json';
import maypop2015 from '../../data-processing/population-data/maypop2015.json';

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

var width = 800;
var height = 800;

var cellWidth = width/10;
var cellHeight = height/10;

var steps = 5;
var tempColorScale = d3.scaleQuantile()
  .domain([20, 10])
  .range(d3.schemeRdBu[steps].reverse());

var speciesNum = 11;
var populationColorScale = d3.scaleOrdinal(d3.schemeSpectral[speciesNum]);

//d3["interpolatePlasma"]
var chloroColorScale = d3.scaleSequential(d3.interpolatePlasma());

var tempColorLegend = legendColor()
  .labelFormat(d3.format(".2f"))
  .scale(tempColorScale)
  .shapePadding(0)
  .shapeWidth(20)
  .shapeHeight(20)
  .labelOffset(10);

var tempLegend = d3.select("#temp-legend")
  .append("g")
//   .attr("transform", "translate(5, 5)")
  .call(tempColorLegend);  

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
		return populationColorScale(d);
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

var chloroLegend;

// initialize and create fullscreen version
var matrixData = data;

var fullScreenConfig = {
	'containerID': 'container',
	'matrixData': matrixData,
	'height': height,
	'width': width
}

var panel1Config = {
	'containerID': 'panel-1',
	'matrixData': matrixData,
	'height': height,
	'initialYear': 2011,
	'width': width
}

var panel2Config = {
	'containerID': 'panel-2',
	'matrixData': matrixData,
	'height': height,
	'initialYear': 2015,
	'width': width
}

createScene(panel1Config); 
createScene(panel2Config); 


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

/*   Functions   */

function createScene(config){
	config['scene'] = new THREE.Scene();
	config['camera'] = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 20 );
	config['camera'].position.z = 10;
	config['renderer'] = new THREE.WebGLRenderer();
	
	drawScene(config);
}

function drawScene(config){
	config['renderer'].setSize(config['width'], config['height'] );
	document.getElementById(config['containerID']).appendChild( config['renderer'].domElement ); 
	loadMesh(config);
}

function loadTexture(url) {
  return new Promise(resolve => {
    new THREE.TextureLoader().load(url, resolve);
  });
}

function loadMaterial(model) {
  const textureKeys = ['cloth', 'wave'];	
  const params = {};
  const promises = Object.keys(model).map(key => {
    // load textures for supported keys
    if (textureKeys.indexOf(key) !== -1) {
      return loadTexture(model[key]).then(texture => {
        params[key] = texture;
      });
    // just copy the value otherwise  
    } else {
      params[key] = model[key];
    }
  });
  
  return Promise.all(promises).then(() => {
    return params;
  });
}

function loadMesh(config) {
	const model = {
		material: {
			cloth: './src/img/clothweave.jpg',
			wave: './src/img/wave.png'
		}
	};
	const promises = [
		loadMaterial(model.material)
	];

	return Promise.all(promises).then(result => {
		var textures = result[0];
	    initGrid(textures,config['initialYear'],config);
		config['renderer'].render( config['scene'], config['camera'] );
		// return new THREE.Mesh(result[0], result[1]);
	});
}

function initGrid(textures,year, config){
	var i=0, j=0, counter = 0;
    var leftX = (-(width) / 2) + (cellWidth / 2); //left
    var topY = ((height) / 2) - (cellHeight / 2);//top
   	var lat=0,lon=0;

	for(i=topY; i > -(height/2), lat < 10; lat++, i = i - cellHeight){
    	for(lon=0,j = leftX; j < (width / 2), lon < 10; lon++, j=j + cellWidth){
    		config['matrixData'][counter]['pos'] = [j,i];
    		counter++;
		}
    }

    initPopData(config,2011,maypop2011);
    initPopData(config,2015,maypop2015);

	config['matrixData'].forEach(function(cell){
		var color = (cell[year]['sst'] == -9999) ? "black":tempColorScale(cell[year]['sst']);
		var degree = (cell[year]['windDegree'] == -9999) ? false: Math.radians(cell[year]['windDegree']);
		cell[year]['popGroup'] = new THREE.Group();

		var x = cell['pos'][0];
		var y = cell['pos'][1];
		var mesh = addCell(x,y,textures, color, degree, config, cell, year);  //create and render glyph

		cell['mesh'] = mesh;
		config['scene'].add(mesh);
	});
}

function addCell(xPos,yPos,textures,color, degree, config, cell,year){
	var group = new THREE.Group();

	//Sea Surface Temperature
	textures['cloth'].anisotropy = config['renderer'].getMaxAnisotropy();
	var geometry = new THREE.BoxGeometry( cellWidth, cellHeight, 1 );
	var material = new THREE.MeshBasicMaterial({map: textures['cloth'], color: color});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(xPos, yPos, 0);
	group.add(mesh);

	//Color Circle for chlorophyll 
	drawCholorphyll();

	//Wind direction on top
	// var windMesh = drawWind(xPos,yPos,textures['wave'], degree);
	// group.add(windMesh);

	//Population Bars
	var populationMesh = drawPopulation(xPos,yPos,cell,year);
	group.add(cell[year]['popGroup']);

	return group;
}

//deprecated
function updateCells(year) {
	fullScreenConfig['matrixData'].forEach(function(cell){
	    var color = (cell[year]['sst'] == -9999) ? "black":tempColorScale(cell[year]['sst']);
	    cell['mesh'].material.color.set(color);
	});

	//TODO:Update Wind

	//TODO:Update Chlorophyll

	fullScreenConfig['renderer'].render( fullScreenConfig['scene'], fullScreenConfig['camera'] );
}

function drawWind(xPos,yPos,texture, degree){
	//based on x_wind, y_wind create the vector and determine degree to rotate
	var material = new THREE.SpriteMaterial( {  color: 0xffffff, map: texture, rotation: degree} );
	material.opacity = 0.25;
	var sprite = new THREE.Sprite( material );
	//1H = 1.59343148358W
	sprite.scale.set(50,50,1.0);
	if(!degree){sprite.scale.set(1 ,1,1.0);}
	sprite.position.set(xPos, yPos, 1);

	return sprite
	//scene.add( sprite );
}

//TODO:
function drawCholorphyll(){
	//based on volume of cholrophyll for a given cell random speckling
}

function drawRect(xPos, yPos, color, height, width, degree) {
	var geometry = new THREE.BoxGeometry(height, width, 0);
	var material = new THREE.MeshBasicMaterial({color: color});
	var mesh = new THREE.Mesh(geometry, material);
	
	mesh.position.set(xPos, yPos, 1);
	var radians = Math.radians(degree);
	var r = 20;
	var move = [r*Math.cos(radians),r*Math.sin(radians)];

	mesh.translateX(move[0]);
	mesh.translateY(move[1]);

	mesh.rotation.z = ((degree+90)*Math.PI)/180;

	return mesh;
}

function initPopData(config,year,mayPopData){
	var species = Object.keys(mayPopData[0]);
	var populations = [];

	//all 17 species
	species.forEach(function(key){
		if(key != 'lat' && key != 'lon'){
			populations.push(key);
		}
	});



	config['matrixData'].forEach(function(cell){
		var popChartData = [];
		var degree = 0;
		var degreeInc = 360/populations.length;
		

		var popCounts = {};
		populations.forEach(function(pop){
			popCounts[pop] = 0;
		});
		for (var i = 0; i < mayPopData.length; i++) {
			var popCell = mayPopData[i]
			var popCellLat = mayPopData[i]["lat"];
			var popCellLon = mayPopData[i]["lon"];
	
			if (popCellLat >= cell["latRange"][0] && popCellLat < cell["latRange"][1] && popCellLon >= cell["lonRange"][0] && popCellLon < cell["lonRange"][1]) {
				populations.forEach(function(p){
					popCounts[p] = popCounts[p] + popCell[p];
					
				});
			}
		}
		var degree = 0;
		populations.forEach(function(d){
			var populationData = {
						'name': '',
						'degree':0,
						'count': 0,
						'height':0
					};

			 populationData['count'] = popCounts[d];
			 populationData['degree'] = degree;
			 populationData['height'] = popCounts[d];
			 populationData['name'] = d;

			 degree = degree + 360/17;
			 popChartData.push(populationData);
		});
		cell[year]['popChartData'] = popChartData;
	});

}

function drawPopulation(xPos,yPos, cell,year){
		//Population 
	var barwidth =5;
	var barheight = 30;
	var popcolor;
	var popdegree = 0;

	cell[year]['popChartData'].forEach(function(pop){
		popcolor = populationColorScale(pop['name']);
		if(pop['count'] > 0){
			var popMesh = drawRect(xPos, yPos, popcolor, barwidth, barheight, pop['degree']);//right
			cell[year]['popGroup'].add(popMesh);
		}
	});
}


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
