import data from './libs/data.json';
import * as dat from 'dat.gui';
import * as constants from './constants';
import gui from './gui';
import scene from './render/scene'
import * as jQuery from 'jquery';

/*TODO: 
		(4) Toggle between wind / unique species count
		(5) Bars to illustrate growth per population from previous year
		(7) Blending for each grid cell *
		(8) Update Grid function (so it displays toggle inputs)
*/

// initialize and create fullscreen version
var matrixData = data;
gui.drawTL();
gui.drawPop();

var panel1Config = {
	'containerID': 'panel-1',
	'matrixData': matrixData,
	'height': constants.getHeight(),
	'initialYear': 2011,
	'width': constants.getWidth(),
	'cellWidth': constants.getCellWidth(),
	'cellHeight': constants.getCellHeight()
}

var panel2Config = {
	'containerID': 'panel-2',
	'matrixData': matrixData,
	'height': constants.getHeight(),
	'initialYear': 2015,
	'width': constants.getWidth(),
	'cellWidth': constants.getCellWidth(),
	'cellHeight': constants.getCellHeight()
}


function load(){
	scene.draw(panel1Config); 
	scene.draw(panel2Config); 
}
load();

//Window on resize
$(window).resize(function() {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
    	console.log(window.innerHeight);

    }, 250);
});


//Function for toggling the centerMark
$('input[name=centerMark]').click(function(e){
	  var status = $('input[name=centerMark]:checked', '#centerMark').val();
	  scene.remove();
	  panel2Config['width'] = 100;
	  panel2Config['height'] = 100;
	  panel2Config['cellWidth'] = panel2Config['width'] / constants.getSize();
	  panel2Config['cellHeight'] = panel2Config['height'] / constants.getSize();
      load();
});

//Function for moving through slides

