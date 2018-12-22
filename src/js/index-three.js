import THREE from 'three';
import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';
import {legendColor, legendSize} from 'd3-svg-legend';

var width = window.innerWidth;
var height = window.innerHeight;

var cellWidth = width/10;
var cellHeight = height/10;

var steps = 5;
var colorScale = d3.scaleQuantize()
  .domain([19, 14])
  .range(d3.schemeRdBu[steps]);

var colorLegend = legendColor()
  .labelFormat(d3.format(".2f"))
  .scale(colorScale)
  .shapePadding(0)
  .shapeWidth(20)
  .shapeHeight(20)
  .labelOffset(10);

// var legend = d3.select("#legend")
//   .append("g")
//   .attr("transform", "translate(5, 5)")
//   .call(colorLegend);

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
var renderer = new THREE.WebGLRenderer();

drawScene();

function drawScene(){
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	
    // instantiate a loader
	var loader = new THREE.TextureLoader();
	loader.load(
		// resource URL
		'./src/img/canvas.png',

		// onLoad callback
		function ( texture ) {
			//create the material when the texture is loaded
			loadGrid(texture);
			renderer.render( scene, camera );
		},

		// onProgress callback currently not supported
		undefined,

		// onError callback
		function ( err ) {
			console.error( 'An error happened.' );
		}
	);
	camera.position.z = 5;
}

function addCell(xPos,yPos,texture){
	texture.anisotropy = renderer.getMaxAnisotropy();
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	var geometry = new THREE.BoxGeometry( cellWidth, cellHeight, 1 );
	// var color = (tempData[lat][lon] == 0.0) ? "black":colorScale(tempData[lat][lon]); 
	var material = new THREE.MeshBasicMaterial({map: texture, color:'#b2b2ff'});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(xPos, yPos, 0);
	scene.add(mesh);
}

function loadGrid(texture){
    var i=0, j=0;
    var leftX = (-(width) / 2) + (cellWidth / 2); //left
    var topY = ((height) / 2) - (cellHeight / 2);//top
   
    for(i=topY; i > -(height/2); i = i - cellHeight){
    	for(j = leftX; j < (width / 2); j=j + cellWidth){
			addCell(j,i,texture)
		}
    }	
}
