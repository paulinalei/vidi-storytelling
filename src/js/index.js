import data from './libs/data.json';
import * as constants from './constants';
import gui from './gui';
import * as jQuery from 'jquery';
import interaction from './interaction';
import * as story from './story';

/*TODO: 
		(4) Toggle between wind / unique species count
		(5) Bars to illustrate growth per population from previous year
		(7) Blending for each grid cell *
*/

// initialize and create fullscreen version
var matrixData = data;
gui.drawTL();
gui.drawPop();

// var panel1Config = {
// 	'containerID': 'panel-1',
// 	'matrixData': matrixData,
// 	'height': constants.getHeight(),
// 	'initialYear': 2011,
// 	'width': constants.getWidth(),
// 	'cellWidth': constants.getCellWidth(),
// 	'cellHeight': constants.getCellHeight()
// }

// var panel2Config = {
// 	'containerID': 'panel-2',
// 	'matrixData': matrixData,
// 	'height': constants.getHeight(),
// 	'initialYear': 2015,
// 	'width': constants.getWidth(),
// 	'cellWidth': constants.getCellWidth(),
// 	'cellHeight': constants.getCellHeight()
// }

//Window on resize
// $(window).resize(function () {
// 	clearTimeout(window.resizedFinished);
// 	window.resizedFinished = setTimeout(function () {

// 	}, 250);
// });


//Function for toggling the centerMark
// $('input[name=centerMark]').click(function (e) {
// 	var status = $('input[name=centerMark]:checked', '#centerMark').val();
// 	scene.remove();
// 	panel2Config['width'] = 100;
// 	panel2Config['height'] = 100;
// 	panel2Config['cellWidth'] = panel2Config['width'] / constants.getSize();
// 	panel2Config['cellHeight'] = panel2Config['height'] / constants.getSize();
// 	load();
// });

//Function for moving through slides
let storyNum = 0;
interaction.updateStory(storyNum, story.stories);
$(document).on('keydown', function(event) {
    if(event.keyCode == 37) {
		event.preventDefault();
		if (storyNum < story.stories.length) {
			if (storyNum <= 0) {
				storyNum = 0;
			} else {
				storyNum--;
			}
    		interaction.updateStory(storyNum, story.stories);
    	}
    }
    else if(event.keyCode == 39) {
    	event.preventDefault();
    	if (storyNum < story.stories.length) {
			if (storyNum >= story.stories.length - 1) {
				storyNum = story.stories.length - 1;
			} else {
				storyNum++;
			}
    		interaction.updateStory(storyNum, story.stories);
    	}
    }
});
