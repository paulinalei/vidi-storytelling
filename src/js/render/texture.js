import THREE from 'three';

function loadTexture(url) {
  return new Promise(resolve => {
    new THREE.TextureLoader().load(url, resolve);
  });
}

var texture = {
	loadMaterial: function(model) {
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
}

export default texture;