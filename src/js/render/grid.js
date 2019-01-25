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

function higherResOcean(xPos,yPos,config,data){
	var n = 27;
	var relLeft = xPos - (config['cellWidth'] / 2);
	var relTop = yPos + (config['cellHeight'] / 2);
	var adjustedX = relLeft + (config['cellWidth']/ (n*2));
	var adjustedY = relTop - (config['cellHeight']/ (n*2));
	var xStart = adjustedX;
	var i,j;
	var patches = new THREE.Group();
	var counter = 0;
	for(i=0;i<n;i++,adjustedY=adjustedY-(config['cellHeight']/n)){
		for(adjustedX=xStart,j=0;j<n;j++,adjustedX=adjustedX+(config['cellWidth']/n)){
			var color = (data[counter] == -9999) ? "black":constants.TEMP_CS(data[counter] );

			var geometry = new THREE.BoxGeometry( config['cellWidth'] / n, config['cellHeight'] / n, 1 );
			var material = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.75});
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(adjustedX, adjustedY, 1);
			patches.add(mesh)

			counter++;
		}
	}
	return patches;
}

function addCell(xPos,yPos,textures,color, degree, config, cell,year){
	
	var group = new THREE.Group();
	var scale = config['width'] / 1000;

	//Sea Surface Temperature
	textures['cloth'].anisotropy = config['renderer'].getMaxAnisotropy();
	textures['cloth'].magFilter = THREE.NearestFilter;
	var geometry = new THREE.BoxGeometry( config['cellWidth'], config['cellHeight'], 1 );
	var material = new THREE.MeshBasicMaterial({map: textures['cloth'], color:"white"}); //"white"
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(xPos, yPos, 0);
	group.add(mesh);

	var sstHD = cell[year]['sstHD'];
	var highResBG = higherResOcean(xPos,yPos,config,sstHD);
	group.add(highResBG);

	//toggle aspects of glpyh that relate to weather
	if(config['showWeather']){
		if(color != "black"){
			//Color Circle for chlorophyll 
			var cholorMesh = drawCholorphyll(xPos,yPos,cell,year,scale);
			group.add(cholorMesh);

			//Wind direction on top
			if(degree){
				var windMesh = drawWind(xPos,yPos,textures['wave'], degree,scale);
				group.add(windMesh);
			}
		}
	}
	
	//Population Bars
	if(config['showPop']){
		var populationMesh = drawPopulation(xPos,yPos,config,cell,year,scale);
		group.add(cell[year]['popGroup']);
		
		if(color != "black" && populationMesh ){
			var cholorMesh = drawCholorphyll(xPos,yPos,cell,year,scale);
			group.add(cholorMesh);

			if(degree){
				var windMesh = drawWind(xPos,yPos,textures['wave'], degree,scale);
				group.add(windMesh);
			}

		}
	}
	


	return group;
}


function drawRect(xPos, yPos, color, height, width, degree, scale) {
	var group = new THREE.Group();
	var geometry = new THREE.BoxGeometry(height, width, 0);
	var material = new THREE.MeshBasicMaterial({color: color});
	var mesh = new THREE.Mesh(geometry, material);
	group.add(mesh);

	var geo = new THREE.EdgesGeometry( geometry );
	var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
	var wireframe = new THREE.LineSegments( geo, mat );
	group.add(wireframe);

	group.position.set(xPos, yPos, 3);
	var radians = Math.radians(degree);
	var r = 15 * scale;
	var move = [r*Math.cos(radians),r*Math.sin(radians)];

	group.translateX(move[0]);
	group.translateY(move[1]);

	group.rotation.z = ((degree+90)*Math.PI)/180;

	

	
	return group;
}

function drawCholorphyll(xPos,yPos,cell,year, scale){
	var cColor = constants.CHLORO_CS(cell[year]['chloro']);
	var group = new THREE.Group();
	var radius = scale * 15;
	var geometry = new THREE.CircleGeometry( radius, 64 );
	var material = new THREE.MeshBasicMaterial( { color: cColor } );
	var circle = new THREE.Mesh( geometry, material );
	group.add(circle);

	var geo = new THREE.EdgesGeometry( geometry );
	var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
	var wireframe = new THREE.LineSegments( geo, mat );
	group.add(wireframe);

	group.position.set(xPos, yPos, 4);
	return group;
}

function drawEmptyCircle(xPos,yPos,scale){
	var group = new THREE.Group();
	var radius = scale * 15;
	var geometry = new THREE.CircleGeometry( radius, 64 );
	var material = new THREE.MeshBasicMaterial( { color: "#c9c9ff" } );
	var circle = new THREE.Mesh( geometry, material );
	group.add(circle);

	var geo = new THREE.EdgesGeometry( geometry );
	var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
	var wireframe = new THREE.LineSegments( geo, mat );
	group.add(wireframe);

	group.position.set(xPos, yPos, 4);
	return group;
}




function drawWind(xPos,yPos,texture, degree, scale){
	//based on x_wind, y_wind create the vector and determine degree to rotate
	var material = new THREE.SpriteMaterial( {  color: 0xffffff, map: texture, rotation: degree} );
	// material.opacity = 0.25;
	var sprite = new THREE.Sprite( material );
	var k = 15 * scale;
	sprite.scale.set(k,k,1.0);
	sprite.position.set(xPos, yPos, 5);
	return sprite
}


function drawPopulation(xPos,yPos,config, cell,year, scale){
		//Population 
	var barwidth = 10 * scale;
	var barheight = 60 * scale;
	var popcolor;
	var popdegree = 0;

	var degreeObj = {
		"Rockfish": 0,
		"Ground Fish": (360 / 8),
		"Forage": (360 / 8) * 2,
		"Cephalopod": (360 /8) * 3,
		"Crustacean": (360 / 8) * 4,
		"Jellyfish": (360 / 8) * 5,
		"Gelatinous": (360 / 8) * 6,
		"Krill": (360 / 8) * 7
	}
	var names = [
		"Rockfish",
		"Ground Fish",
		"Forage",
		"Cephalopod",
		"Crustacean",
		"Jellyfish",
		"Gelatinous",
		"Krill"];

	var hasPopData = false;
	var popInfo = cell[year]['popInfo'];
	if('popInfo' in cell[year]){
		hasPopData = true;
		var maxDiversity = -9999;
		names.forEach(function(species){
			maxDiversity =(popInfo[species] > maxDiversity)? popInfo[species]: maxDiversity;
		});
		console.log(popInfo);
		names.forEach(function(species){
			var count = popInfo[species];
			popcolor = constants.POP_CS(species);
			if(count > 0){
				var delta = count / maxDiversity;
				var height = barheight * delta;
				height = (height > barheight)? barheight: height;
				var popMesh = drawRect(xPos, yPos, popcolor, barwidth, height, degreeObj[species], scale);
				cell[year]['popGroup'].add(popMesh);
			}
		});
	}
	return hasPopData;
}

export default grid;