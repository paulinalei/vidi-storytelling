import THREE from 'three';
import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';
import {legendColor, legendSize} from 'd3-svg-legend';
import data from './libs/data.json';

var width = window.innerWidth;
var height = window.innerHeight;

var cellWidth = width/10;
var cellHeight = height/10;

var steps = 5;
var colorScale = d3.scaleQuantile()
  .domain([20, 10])
  .range(d3.schemeRdBu[steps].reverse());

var colorLegend = legendColor()
  .labelFormat(d3.format(".2f"))
  .scale(colorScale)
  .shapePadding(0)
  .shapeWidth(20)
  .shapeHeight(20)
  .labelOffset(10);

var legend = d3.select("#legend")
  .append("g")
  .attr("transform", "translate(5, 5)")
  .call(colorLegend);  


// initialize and create fullscreen version
var matrixData = data;

var fullScreenConfig = {
	'containerID': 'container',
	'matrixData': matrixData,
	'height': window.innerHeight/2,
	'width': window.innerWidth
}

var panel1Config = {
	'containerID': 'panel-1',
	'matrixData': matrixData,
	'height': window.innerHeight/4,
	'initialYear': 2011,
	'width': window.innerWidth
}

var panel2Config = {
	'containerID': 'panel-2',
	'matrixData': matrixData,
	'height': window.innerHeight/4,
	'initialYear': 2015,
	'width': window.innerWidth
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
	config['camera'] = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
	config['renderer'] = new THREE.WebGLRenderer();
	
	drawScene(config);
}

function drawScene(config){
	config['renderer'].setSize(config['width'], config['height'] );
	document.getElementById(config['containerID']).appendChild( config['renderer'].domElement ); 
	
    // instantiate a loader
	var loader = new THREE.TextureLoader();
	loader.load(
		// resource URL
		'./src/img/clothweave.png',

		// onLoad callback
		function ( texture ) {
			//create the material when the texture is loaded
			initGrid(texture,config['initialYear'],config);
			config['renderer'].render( config['scene'], config['camera'] );
		},

		// onProgress callback currently not supported
		undefined,

		// onError callback
		function ( err ) {
			console.error( 'An error happened.' );
		}
	);

	config['camera'].position.z = 5;
}

function initGrid(texture,year, config){
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

	config['matrixData'].forEach(function(cell){
		var color = (cell[year]['sst'] == -9999) ? "black":colorScale(cell[year]['sst']);
		var i = cell['pos'][0];
		var j = cell['pos'][1]
		var mesh = addCell(i,j,texture, color, config);
		cell['mesh'] = mesh;
		config['scene'].add(mesh);
	});
}

function addCell(xPos,yPos,texture,color,config){
	texture.anisotropy = config['renderer'].getMaxAnisotropy();
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	var geometry = new THREE.BoxGeometry( cellWidth, cellHeight, 1 );
	var material = new THREE.MeshBasicMaterial({map: texture, color: color});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(xPos, yPos, 0);

	//White Speckling for chlorophyll 
	drawCholorphyll();

	//Wind direction on top
	drawWind();

	return mesh;
}

function updateCells(year) {
	fullScreenConfig['matrixData'].forEach(function(cell){
	    var color = (cell[year]['sst'] == -9999) ? "black":colorScale(cell[year]['sst']);
	    cell['mesh'].material.color.set(color);
	});

	//TODO:Update Wind

	//TODO:Update Chlorophyll

	fullScreenConfig['renderer'].render( fullScreenConfig['scene'], fullScreenConfig['camera'] );
}


function getCenterPoint(mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
}

//TODO:
function drawWind(){
	//based on x_wind, y_wind create the vector and determine degree to rotate
	var map = new THREE.TextureLoader().load( "sprite.png" );
	var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
	var sprite = new THREE.Sprite( material );
	//scene.add( sprite );
}

//TODO:
function drawCholorphyll(){
	//based on volume of cholrophyll for a given cell random speckling
}

/*
  Showing monthly population
*/
function drawPopulation(divid, filename) {
	// set the dimensions and margins of the graph
	var margin = {top: 10, right: 10, bottom: 45, left: 60},
	width = 500 - margin.left - margin.right,
	height = 150 - margin.top - margin.bottom;
  
	// parse the date / time
	var parseTime = d3.timeParse("%m/%d/%Y");
  
	// set the ranges
	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);
  
	// define the line
	var valueline = d3.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.pop); });
  
	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select(divid).append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		  "translate(" + margin.left + "," + margin.top + ")");
  
	// Get the data
	d3.csv(filename).then(function(data) {
	  // format the data
	  data.forEach(function(d) {
		d.date = parseTime(d.date);
		d.pop = +d.pop;
	  });
  
	  // Scale the range of the data
	  x.domain(d3.extent(data, function(d) { return d.date; }));
	  y.domain([0, d3.max(data, function(d) { return d.pop; })]);
  
	  // Add the valueline path.
	  svg.append("path")
		.data([data])
		.attr("class", "line")
		.attr("d", valueline);
  
	  // // Add the X Axis
	  svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m/%d/%y")))
		.selectAll("text")
	  		.style("font", "10px")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-55)");
	  // Add the Y Axis
	  svg.append("g")
		.call(d3.axisLeft(y));
	});
  }
  
  drawPopulation("#population-1", "../../data-processing/population-data/maypop2011.csv");
  drawPopulation("#population-2", "../../data-processing/population-data/maypop2015.csv");
