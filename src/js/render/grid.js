import * as constants from '../constants';
import THREE from 'three';
import averageData from '../libs/average_data.json';

var grid = {
	initGrid: function (textures,year, config){
		var i=0, j=0, counter = 0;
	    var leftX = (-(config['width']) / 2) + (config['cellWidth']  / 2); //left
	    var topY = ((config['height']) / 2) - (config['cellHeight'] / 2);//top
	   	var lat=0,lon=0;
		for(i=topY; i > -(config['height']/2), lat < constants.SIZE; lat++, i = i - config['cellHeight']){
	    	for(lon=0,j = leftX; j < (config['width'] / 2), lon < constants.SIZE; lon++, j=j + config['cellWidth']){
	    		config['matrixData'][counter]['pos'] = [j,i];
	    		counter++;
			}
	    }

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
	},
	updateGrid: function(config, year) {
		config['matrixData'].forEach(function(cell){
		    var color = (cell[year]['sst'] == -9999) ? "black":constants.TEMP_CS(cell[year]['sst']);
		    cell['mesh'].material.color.set(color);
		});

		//TODO:Update Wind

		//TODO:Update Chlorophyll

		config['renderer'].render( fullScreenConfig['scene'], fullScreenConfig['camera'] );
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
	var geometry = new THREE.BoxGeometry( config['cellWidth'], config['cellHeight'], 1 );
	var material = new THREE.MeshBasicMaterial({map: textures['cloth'], color: color});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(xPos, yPos, 0);
	group.add(mesh);

	var scale = config['width'] / 1000;
	//Color Circle for chlorophyll 
	var cholorMesh = drawCholorphyll(xPos,yPos,cell,year,scale);
	group.add(cholorMesh);

	//Wind direction on top
	var windMesh = drawWind(xPos,yPos,textures['wave'], degree,scale);
	group.add(windMesh);

	//Population Bars
	var populationMesh = drawPopulation(xPos,yPos,config,cell,year,scale);
	group.add(cell[year]['popGroup']);

	return group;
}


function drawWind(xPos,yPos,texture, degree, scale){
	//based on x_wind, y_wind create the vector and determine degree to rotate
	var material = new THREE.SpriteMaterial( {  color: 0xffffff, map: texture, rotation: degree} );
	// material.opacity = 0.25;
	var sprite = new THREE.Sprite( material );
	var k = 15 * scale;
	sprite.scale.set(k,k,1.0);
	if(!degree){sprite.scale.set(1 ,1,1.0);}
	sprite.position.set(xPos, yPos, 4);

	return sprite
}

function drawCholorphyll(xPos,yPos,cell,year, scale){
	var cColor = constants.CHLORO_CS(cell[year]['chloro']);

	var radius = scale * 15;
	var geometry = new THREE.CircleGeometry( radius, 64 );
	var material = new THREE.MeshBasicMaterial( { color: cColor } );
	var circle = new THREE.Mesh( geometry, material );
	circle.position.set(xPos, yPos, 3);
	return circle;
}

function drawRect(xPos, yPos, color, height, width, degree, scale) {
	var geometry = new THREE.BoxGeometry(height, width, 0);
	var material = new THREE.MeshBasicMaterial({color: color});
	var mesh = new THREE.Mesh(geometry, material);
	
	mesh.position.set(xPos, yPos, 1);
	var radians = Math.radians(degree);
	var r = 20 * scale;
	var move = [r*Math.cos(radians),r*Math.sin(radians)];

	mesh.translateX(move[0]);
	mesh.translateY(move[1]);

	mesh.rotation.z = ((degree+90)*Math.PI)/180;

	return mesh;
}

function drawPopulation(xPos,yPos,config, cell,year, scale){
		//Population 
	var barwidth =10 * scale;
	var barheight = 40 * scale;
	var popcolor;
	var popdegree = 0;

	var popInfo = cell[year]['popInfo'];
	if('popInfo' in cell[year]){
		popInfo['levelOne'].forEach(function(species){
			var count = popInfo['levelOneMap'][species];
			popcolor = constants.POP_CS(species);
			if(count > 0){
				var species_avg = averageData[year]['L1'][species]['average'];
				var delta = count / species_avg;
				var height = barheight * delta;
				height = (height > barheight)? barheight: height;

				var popMesh = drawRect(xPos, yPos, popcolor, barwidth, height, popdegree, scale);
				popdegree = popdegree + (360 / popInfo['levelOne'].length);
				cell[year]['popGroup'].add(popMesh);
			}
		});
	}
	
}

export default grid;