import data from './libs/data.json';
import * as dat from 'dat.gui';
import * as constants from './constants';
import gui from './gui';
import scene from './render/scene'
import * as jQuery from 'jquery';

/*TODO: (1) Add slide code from last years entry
		(2) Data for 2 other cases
		(3) Unqiue species count per cell
		(4) Toggle between wind / unique species count
		(5) Bars to illustrate growth per population from previous year
		✓(6) Clean up UI & GUI (legend)
		(7) Blending for each grid cell *
		(8) Update Grid function (so it displays toggle inputs)
*/

// initialize and create fullscreen version
var matrixData = data;
gui.drawTL();
gui.drawPop();

function load(){
	var panel1Config = {
		'containerID': 'panel-1',
		'matrixData': matrixData,
		'height': constants.getHeight(),
		'initialYear': 2011,
		'width': constants.getWidth()
	}

	var panel2Config = {
		'containerID': 'panel-2',
		'matrixData': matrixData,
		'height': constants.getHeight(),
		'initialYear': 2015,
		'width': constants.getWidth()
	}

	scene.draw(panel1Config); 
	scene.draw(panel2Config); 
}
load();

//Window on resize
$(window).resize(function() {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function(){
    	console.log(constants.getWidth());
        constants.setHeight(Window.innerHeight);
        constants.setWidth(Window.innerHeight);
        console.log(constants.getWidth());
    }, 250);
});


//Function for toggling the centerMark
$('input[name=centerMark]').click(function(e){
	  var status = $('input[name=centerMark]:checked', '#centerMark').val();
	  scene.remove();
      load();
});

//Function for moving through slides

