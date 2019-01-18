import data from './libs/data.json';

let matrixData = data;
var interaction = {
    updateStory: function(storyNum, stories) {
        var currentStory = stories[storyNum];
        
        // if no image and no canvas
        if (!currentStory['image'] && !currentStory['canvas']) {
            if (currentStory['title']) {
                $('#title').html(currentStory['title']);
            } else {
                $('#title').html('');
            }
            if (currentStory['explanation']) {
                $('#explanation').html(currentStory['explanation']);
            } else {
                $('#explanation').html('');
            }
        }
        
        // if canvas
        if (currentStory['canvas']) {
            for (var i = 0; i < currentStory['canvas'].length; i++) {
                var panel = document.createElement('div');
                var config = currentStory['canvas'][i];
                panel.id = config['containerID'];
                panel.className = 'panel';
                config['data'] = matrixData;
                config['height'] = 1000;
                config['width'] = 1000;
            }
        }
    }
}

function hideBlocks(){
	$('#blockA').toggleClass('hide');
	$('#blockB').toggleClass('hide');
	$('#blockC').toggleClass('hide');
}
export default interaction;