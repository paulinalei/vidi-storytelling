import grid from './grid';
import THREE from 'three';
import texture from './texture';

function loadMesh(config) {
	const model = {
		material: {
			cloth: './src/img/clothweave.jpg',
			wave: './src/img/arrow.png'
		}
	};
	const promises = [
		texture.loadMaterial(model.material)
	];

	return Promise.all(promises).then(result => {
		var textures = result[0];
	    grid.initGrid(textures,config['initialYear'],config);
		config['renderer'].render( config['scene'], config['camera'] );
		// return new THREE.Mesh(result[0], result[1]);
	});
}

var scene = {
	draw: function(config){
		config['scene'] = new THREE.Scene();
		config['camera'] = new THREE.OrthographicCamera( config['width'] / - 2, config['width'] / 2, config['height'] / 2,  config['height'] / - 2, 1, 20 );
		config['camera'].position.z = 10;
		config['renderer'] = new THREE.WebGLRenderer({antialias: true});
		config['renderer'].setSize(config['width'], config['height'] );
		document.getElementById(config['containerID']).appendChild( config['renderer'].domElement ); 
		loadMesh(config);
	}
}

export default scene;