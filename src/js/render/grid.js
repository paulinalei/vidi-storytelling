import * as constants from '../constants';
import THREE from 'three';
import maypop2011 from '../../../data-processing/population-data/maypop2011.json';
import maypop2015 from '../../../data-processing/population-data/maypop2015.json';
import speciesClass from '../libs/speciesClass.json';

var grid = {
	initGrid: function (textures,year, config){
		var i=0, j=0, counter = 0;
	    var leftX = (-(config['width']) / 2) + (constants.CELLWIDTH / 2); //left
	    var topY = ((config['height']) / 2) - (constants.CELLHEIGHT / 2);//top
	   	var lat=0,lon=0;
	   	console.log(config['matrixData']);
		for(i=topY; i > -(config['height']/2), lat < constants.SIZE; lat++, i = i - constants.CELLHEIGHT){
	    	for(lon=0,j = leftX; j < (config['width'] / 2), lon < constants.SIZE; lon++, j=j + constants.CELLWIDTH){
	    		config['matrixData'][counter]['pos'] = [j,i];
	    		counter++;
			}
	    }
	    config['matrixData']['maxPopCell'] = {'value':-9999,'name':''};
	    config['matrixData']['averages'] = {};
	    initPopData(config,2011,maypop2011);
	    initPopData(config,2015,maypop2015);

		config['matrixData'].forEach(function(cell){
			var color = (cell[year]['sst'] == -9999) ? "black":constants.TEMP_CS(cell[year]['sst']);
			var degree = (cell[year]['windDegree'] == -9999) ? false: Math.radians(cell[year]['windDegree']);
			cell[year]['popGroup'] = new THREE.Group();

			var x = cell['pos'][0];
			var y = cell['pos'][1];
			var mesh = addCell(x,y,textures, color, degree, config, cell, year);  //create and render glyph

			cell['mesh'] = mesh;
			config['scene'].add(mesh);
		});
	}
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

function addCell(xPos,yPos,textures,color, degree, config, cell,year){
	var group = new THREE.Group();

	//Sea Surface Temperature
	textures['cloth'].anisotropy = config['renderer'].getMaxAnisotropy();
	textures['cloth'].magFilter = THREE.NearestFilter;
	var geometry = new THREE.BoxGeometry( constants.CELLWIDTH, constants.CELLHEIGHT, 1 );
	var material = new THREE.MeshBasicMaterial({map: textures['cloth'], color: color});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(xPos, yPos, 0);
	group.add(mesh);

	//Color Circle for chlorophyll 
	var cholorMesh = drawCholorphyll(xPos,yPos,cell,year);
	group.add(cholorMesh);

	//Wind direction on top
	var windMesh = drawWind(xPos,yPos,textures['wave'], degree);
	group.add(windMesh);

	//Population Bars
	var populationMesh = drawPopulation(xPos,yPos,config,cell,year);
	group.add(cell[year]['popGroup']);

	return group;
}

//deprecated
function updateCells(year) {
	fullScreenConfig['matrixData'].forEach(function(cell){
	    var color = (cell[year]['sst'] == -9999) ? "black":constants.TEMP_CS(cell[year]['sst']);
	    cell['mesh'].material.color.set(color);
	});

	//TODO:Update Wind

	//TODO:Update Chlorophyll

	fullScreenConfig['renderer'].render( fullScreenConfig['scene'], fullScreenConfig['camera'] );
}

function drawWind(xPos,yPos,texture, degree){
	//based on x_wind, y_wind create the vector and determine degree to rotate
	var material = new THREE.SpriteMaterial( {  color: 0xffffff, map: texture, rotation: degree} );
	// material.opacity = 0.25;
	var sprite = new THREE.Sprite( material );
	//1H = 1.59343148358W
	sprite.scale.set(25,25,1.0);
	if(!degree){sprite.scale.set(1 ,1,1.0);}
	sprite.position.set(xPos, yPos, 4);

	return sprite
	//scene.add( sprite );
}

//TODO:
function drawCholorphyll(xPos,yPos,cell,year){
	var cColor = constants.CHLORO_CS(cell[year]['chloro']);
	var geometry = new THREE.CircleGeometry( 15, 64 );
	var material = new THREE.MeshBasicMaterial( { color: cColor } );
	var circle = new THREE.Mesh( geometry, material );
	circle.position.set(xPos, yPos, 3);
	//based on volume of cholrophyll for a given cell random speckling
	return circle;
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
	var averages = {};

	//all 17 species
	species.forEach(function(key){
		if(key != 'lat' && key != 'lon'){
			populations.push(key);
			averages[key] = {'count':0,'sum':0,'average':0} 
		}
	});


	var maxValue = -9999;
	var maxName = '';
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

			 if(popCounts[d] > 0){
				popChartData.push(populationData);
				averages[d]['sum'] = averages[d]['sum'] + popCounts[d];
				averages[d]['count'] = averages[d]['count'] + 1;
			}


			 //Metrics:
			 
			 maxName =  (maxValue < popCounts[d])? d: maxName;
			 maxValue = (maxValue < popCounts[d])? popCounts[d]: maxValue;
		});
		cell[year]['popChartData'] = popChartData;
	});
	config['matrixData']['maxPopCell']['name'] = (config['matrixData']['maxPopCell']['value'] < maxValue)? maxName : config['matrixData']['maxPopCell']['name'];
	config['matrixData']['maxPopCell']['value'] =(config['matrixData']['maxPopCell']['value'] < maxValue)? maxValue : config['matrixData']['maxPopCell']['value'];
	config['matrixData']['averages'][year] = averages;
}

function drawPopulation(xPos,yPos,config, cell,year){
		//Population 
	var barwidth =5;
	var barheight = 30;
	var popcolor;
	var popdegree = 0;
	var averages = config['matrixData']['averages'][year];
	console.log(speciesClass);
	//take the popChartData for this and map it such that it is the right ranking

	cell[year]['popChartData'].forEach(function(pop){
		if(pop['count'] > 0){
			popcolor = constants.POP_CS(pop['name']);
			var stats = averages[pop['name']];
			var average = stats['sum'] / stats['count'];
			var heightScale = pop['count'] / average;
			var height = (barheight / 2) * heightScale;
			height = (height > barheight) ? barheight : height;

			var popMesh = drawRect(xPos, yPos, popcolor, barwidth, height, pop['degree']);//right
			cell[year]['popGroup'].add(popMesh);
		}
		
	});
}

export default grid;