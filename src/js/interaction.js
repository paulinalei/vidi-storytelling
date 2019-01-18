import data from './libs/data.json';

let matrixData = data;
var interaction = {
    updateStory: function(storyNum, stories) {
        var currentStory = stories[storyNum];
        
        // if no image and no canvas
        if (!currentStory['image'] && !currentStory['canvas']) {
            hideBlocks();
            hideExplanation();
            if (currentStory['title']) {
                showTitle();
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

        //if image 
        if (currentStory['image']) {
            hideTitle();
            hideBlocks();
            if (currentStory['explanation']) {
                showExplanation();
                $('#image-explanation').html(currentStory['explanation']);
            } else {
                $('#image-explanation').html('');
            }
            $('#image').attr('src', currentStory['image']);
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

function hideTitle(){
	$('#titlePage').addClass('hide');
}

function showTitle(){
	$('#titlePage').removeClass('hide');
}

function hideExplanation() {
    $('#imageExplanation').addClass('hide');
}

function showExplanation() {
    $('#imageExplanation').removeClass('hide');
}

function hideBlocks(){
	$('#blockA').addClass('hide');
	$('#blockB').addClass('hide');
	$('#blockC').addClass('hide');
}

function showBlocks(){
	$('#blockA').removeClass('hide');
	$('#blockB').removeClass('hide');
	$('#blockC').removeClass('hide');
}
export default interaction;