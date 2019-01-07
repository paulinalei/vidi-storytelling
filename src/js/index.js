import THREE from 'three';
import * as d3 from 'd3';
import {sliderHorizontal} from 'd3-simple-slider';
import {legendColor, legendSize} from 'd3-svg-legend';

var width = window.innerWidth;
var height = window.innerHeight;

var cellWidth = width/10;
var cellHeight = height/10;

var sstdata2009 = [[15.012, 15.0238, 14.9098, 14.5351, 14.122, 13.8798, 13.9083, 13.9867, 14.3165, 14.1745], [14.4797, 14.4615, 14.3744, 14.1054, 13.7769, 13.6118, 13.5773, 13.7473, 14.4771, -9999.0], [14.198, 14.0629, 13.9409, 13.7404, 13.589, 13.5555, 13.6252, 13.9947, -9999.0, -9999.0], [13.9613, 13.7314, 13.5774, 13.449, 13.5541, 13.7097, 14.2932, 14.0499, -9999.0, -9999.0], [13.6931, 13.2745, 13.086, 13.1347, 13.6009, 14.1806, 16.2726, -9999.0, -9999.0, -9999.0], [13.4732, 12.8906, 12.5939, 12.6771, 13.6133, 14.7242, 16.3923, -9999.0, -9999.0, -9999.0], [13.1095, 12.5543, 12.1599, 12.3011, 13.5331, 15.326, 16.0715, -9999.0, -9999.0, -9999.0], [12.7033, 12.3422, 12.066, 12.0482, 13.4056, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [12.2796, 12.0144, 11.8139, 12.928, 16.2617, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [11.8684, 11.59, 12.8719, 16.2617, 16.2617, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0]]
var sstdata2010 = [[15.7892, 15.4715, 15.1373, 14.8705, 14.6467, 14.5453, 14.4852, 14.4434, 14.3794, 13.9354], [15.6887, 15.3429, 14.9837, 14.6919, 14.4672, 14.3144, 14.2295, 14.2079, 14.1715, -9999.0], [15.3488, 15.0119, 14.6689, 14.3899, 14.2572, 14.1216, 14.0699, 14.0985, -9999.0, -9999.0], [14.8335, 14.5389, 14.2318, 14.0626, 14.2031, 14.2899, 14.7284, 14.2981, -9999.0, -9999.0], [14.2751, 14.0004, 13.775, 13.7704, 14.2, 14.6858, 16.4499, 16.711, -9999.0, -9999.0], [13.8454, 13.5839, 13.4302, 13.5058, 14.2984, 15.1784, 16.5547, 16.85, -9999.0, -9999.0], [13.4123, 13.1876, 13.0729, 13.2322, 14.2318, 15.6289, 16.3755, -9999.0, -9999.0, -9999.0], [13.0505, 12.8341, 12.754, 12.8943, 14.0842, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [12.8313, 12.5709, 12.4747, 13.4447, 16.5827, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [12.7341, 12.4313, 13.3547, 16.5827, 16.5827, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0]]
var sstdata2011 = [[14.1392, 14.0984, 14.09, 14.0192, 13.8929, 13.7597, 13.6797, 13.605, 13.762, 13.563], [13.609, 13.6813, 13.7381, 13.6721, 13.4959, 13.3462, 13.2507, 13.1741, 13.4176, -9999.0], [13.2335, 13.3785, 13.4125, 13.2465, 13.0819, 12.9924, 13.0873, 13.175, -9999.0, -9999.0], [12.9652, 13.0826, 13.0839, 12.8998, 12.8906, 12.9103, 13.4792, 13.217, -9999.0, -9999.0], [12.7864, 12.7468, 12.7347, 12.6607, 12.8763, 13.1049, 14.7811, 14.6025, -9999.0, -9999.0], [12.6803, 12.4126, 12.3591, 12.4493, 13.0195, 13.5812, 14.8445, 14.6037, -9999.0, -9999.0], [12.6205, 12.1909, 11.9988, 12.193, 13.0015, 13.9036, 14.6097, -9999.0, -9999.0, -9999.0], [12.5342, 12.0421, 11.6376, 11.6684, 12.0458, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [12.4742, 12.0279, 11.4757, 11.2202, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [12.3634, 11.9017, 10.9041, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0]]
var sstdata2015 = [[18.3705, 18.2847, 18.2232, 18.1521, 18.0997, 18.0142, 18.068, 18.128, 18.4488, 19.485], [18.2502, 18.2107, 18.1341, 18.02, 17.9185, 17.7651, 17.7202, 17.578, 17.6345, -9999.0], [17.9518, 18.0241, 18.0225, 17.8943, 17.8076, 17.6734, 17.7223, 17.5402, -9999.0, -9999.0], [17.6482, 17.8034, 17.7594, 17.5854, 17.5571, 17.5638, 18.0036, 17.5547, -9999.0, -9999.0], [17.4002, 17.4618, 17.3195, 17.159, 17.2518, 17.5006, 19.6147, -9999.0, -9999.0, -9999.0], [17.2178, 17.0936, 16.8608, 16.7386, 17.1097, 17.7503, 19.6042, -9999.0, -9999.0, -9999.0], [16.8398, 16.6562, 16.4237, 16.4411, 17.0497, 18.3037, 19.0566, -9999.0, -9999.0, -9999.0], [16.4033, 16.2083, 16.0692, 16.0637, 16.3897, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [16.0539, 15.8079, 15.5987, 15.5268, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [15.8468, 15.45, 14.9846, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0]]
var sstdata2016 = [[16.8487, 16.603, 16.4336, 16.243, 16.0631, 15.7722, 15.5611, 15.2891, 15.2609, 15.5796], [16.6088, 16.4532, 16.3111, 16.081, 15.8115, 15.5572, 15.4194, 15.2507, 15.6539, -9999.0], [16.348, 16.2456, 16.0983, 15.8355, 15.5962, 15.4489, 15.4161, 15.5051, -9999.0, -9999.0], [16.0334, 15.9643, 15.7296, 15.4551, 15.3239, 15.3393, 15.7057, 15.7113, -9999.0, -9999.0], [15.578, 15.4485, 15.2246, 15.1177, 15.3134, 15.7539, 18.3796, -9999.0, -9999.0, -9999.0], [15.1557, 14.8468, 14.6261, 14.6026, 15.2257, 16.2479, 18.6426, -9999.0, -9999.0, -9999.0], [14.6962, 14.2691, 14.0501, 14.1263, 15.0869, 16.9102, 17.8644, -9999.0, -9999.0, -9999.0], [14.4308, 13.9659, 13.6537, 13.5577, 13.7739, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [14.1652, 13.6904, 13.1237, 13.0897, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [14.1238, 13.786, 13.0585, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0]]
var sstdata2017 = [[17.1778, 17.1527, 17.1513, 16.8207, 16.057, 15.318, 14.8683, 14.8299, 14.8171, 12.6483], [16.8622, 16.8322, 16.8099, 16.4538, 15.7098, 14.9592, 14.4259, 14.1834, 13.5983, -9999.0], [16.3578, 16.2757, 16.1647, 15.7246, 15.246, 14.7075, 14.4308, 14.2613, -9999.0, -9999.0], [15.4826, 15.3943, 15.2726, 14.9267, 14.666, 14.3874, 14.5132, 14.3088, -9999.0, -9999.0], [14.7399, 14.4491, 14.3402, 14.1998, 14.3027, 14.3531, 19.0136, -9999.0, -9999.0, -9999.0], [14.2806, 13.7558, 13.6606, 13.7472, 14.3369, 15.1286, 19.0462, -9999.0, -9999.0, -9999.0], [13.958, 13.251, 13.0493, 13.2074, 14.5405, 17.6825, 19.5152, -9999.0, -9999.0, -9999.0], [13.4247, 12.8461, 12.6845, 12.7424, 12.9846, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [12.9413, 12.4565, 12.2284, 12.1369, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [12.4158, 12.1374, 11.5729, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0]]
var sstdata2018 = [[17.2802, 17.217, 16.9556, 16.6666, 16.4058, 16.4381, 16.5967, 16.9258, 17.3752, 16.96], [17.223, 17.192, 16.9072, 16.5934, 16.3423, 16.348, 16.3659, 16.5869, 17.9886, -9999.0], [17.0359, 17.0607, 16.8071, 16.4699, 16.2304, 16.1992, 16.2619, 16.3804, -9999.0, -9999.0], [16.8095, 16.8419, 16.5346, 16.181, 16.0412, 16.1463, 16.7503, 16.3887, -9999.0, -9999.0], [16.4613, 16.4386, 16.1466, 15.8816, 15.8496, 16.1273, 18.9665, -9999.0, -9999.0, -9999.0], [16.0916, 15.927, 15.6708, 15.5179, 15.7461, 16.4605, 19.0603, -9999.0, -9999.0, -9999.0], [15.6695, 15.393, 15.216, 15.2685, 15.8204, 17.3122, 18.3505, -9999.0, -9999.0, -9999.0], [15.521, 15.1218, 14.8655, 14.9251, 15.222, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [15.4584, 14.9795, 14.4957, 14.5765, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0], [15.6722, 15.2392, 14.3217, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0, -9999.0]]

var meshMatrix = [];

var steps = 5;
var colorScale = d3.scaleQuantile()
  .domain([20, 10])
  .range(d3.schemeRdBu[steps].reverse());

console.log(colorScale(15.012));

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

var slider = sliderHorizontal()
  .min(2009)
  .max(2018)
  .step(1)
  .width(300)
  .displayValue(false)
  .tickFormat(d3.format(''))
  .on('onchange', val => {
    if (val == "2009") {
      updateCells(sstdata2009);
    } else if (val == "2010") {
      updateCells(sstdata2010);
    } else if (val == "2011") {
      updateCells(sstdata2011);
    } else if (val == "2015") {
      updateCells(sstdata2015);
    } else if (val == "2016") {
      updateCells(sstdata2016);
    } else if (val == "2017") {
      updateCells(sstdata2017);
    } else if (val == "2018") {
      updateCells(sstdata2018);
    } else {
      console.log("no data for it currently");
    }
  });

var group = d3.select("#slider")
  .append("svg")
  .attr("width", 700)
  .attr("height", 100)
  .append("g")
  .attr("transform", "translate(350,30)")
  .call(slider);

var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
var renderer = new THREE.WebGLRenderer();

drawScene();

function updateCells(tempData) {
	var i=0,j=0,k=0;
	//Update for SST
	for(i=0; i < tempData.length; i++){
		for(j=0; j < tempData[0].length; j++, k++){
			var color = (tempData[i][j] == 0.0) ? "0x000000":colorScale(tempData[i][j]);
			console.log(color);
			meshMatrix[k].material.color.set(color);
		}
	}

	//TODO:Update Wind

	//TODO:Update Chlorophyll

	renderer.render( scene, camera );
}

//initial
function drawScene(){
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById('container').appendChild( renderer.domElement ); //change target
	
    // instantiate a loader
	var loader = new THREE.TextureLoader();
	loader.load(
		// resource URL
		'./src/img/clothweave.jpg',

		// onLoad callback
		function ( texture ) {
			//create the material when the texture is loaded
			loadGrid(texture, sstdata2009);
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
}

//TODO:
function drawCholorphyll(){
	//based on volume of cholrophyll for a given cell random speckling
}

function addCell(xPos,yPos,texture,color){
	texture.anisotropy = renderer.getMaxAnisotropy();
	var material = new THREE.MeshBasicMaterial( {map: texture} );
	var geometry = new THREE.BoxGeometry( cellWidth, cellHeight, 1 );
	var material = new THREE.MeshBasicMaterial({map: texture, color: color});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(xPos, yPos, 0);

	//White Speckling for chlorophyll 
	drawCholorphyll();

	//Wind direction on top
	drawWind();

	meshMatrix.push(mesh);
	scene.add(mesh);
}

function loadGrid(texture, data){
    var i=0, j=0;
    var leftX = (-(width) / 2) + (cellWidth / 2); //left
    var topY = ((height) / 2) - (cellHeight / 2);//top
   	var lat=0,lon=0;

    for(i=topY; i > -(height/2), lat < data.length; lat++, i = i - cellHeight){
    	for(lon=0,j = leftX; j < (width / 2), lon < data[0].length; lon++, j=j + cellWidth){
    		var color = (data[lat][lon] == 0.0) ? "black":colorScale(data[lat][lon]); 
			addCell(j,i,texture, color);
		}
    }	
}

function updateGrid(){
	
}
