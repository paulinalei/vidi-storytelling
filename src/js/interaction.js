import data from './libs/data.json';
import * as constants from './constants';
import scene from './render/scene'

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

            if (currentStory['titlePage']) {
                $('#title').addClass('largeF');
            } else{
                 $('#title').removeClass('largeF');
            }

            if (currentStory['explanation']) {
                $('#explanation').html(currentStory['explanation']);
            } else {
                $('#explanation').html('');
            }

            if (currentStory['title-explanation-src']) {
                // $('#title-explanation-src').html([*]reference);
                $('#title-explanation-src').html(currentStory['title-explanation-src']);
            } else {
                $('#title-explanation-src').html('');
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

            if (currentStory['image-src']) {
                $('#imgSrc').html(currentStory['image-src']);
            } else {
                $('#imgSrc').html('');
            }

            if (currentStory['first']) {
                $('#image').addClass('first');
            } else {
                $('#image').removeClass('first');
                $('#image').addClass('not-first');
            }
            $('#image').attr('src', currentStory['image']);
        }
        
        // if canvas
        if (currentStory['canvas']) {
            hideExplanation();
            hideTitle();
            showBlocks();
            $("#grid").empty();

            if (currentStory['title']) {
                $('#blockExplanation').html(currentStory['title']);
            } else {
                $('#blockExplanation').html('');
            }
            for (var i = 0; i < currentStory['canvas'].length; i++) {
                var panel = document.createElement('div');
                var config = currentStory['canvas'][i];
                panel.id = config['containerID'];
                panel.className = 'panel';
                $("#grid").append(panel);
                var sections = ( currentStory['canvas'].length > 1)? 2 : 1;
                var dimension = (window.innerHeight * .85) / sections;
                var quality = 1000;
                config['matrixData'] = matrixData;
                config['img-dim'] = dimension
                config['height'] = quality;
                config['width'] = quality;
                config['cellWidth'] = quality / constants.SIZE;
                config['cellHeight'] = quality / constants.SIZE;
                scene.draw(config);
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