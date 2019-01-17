var storyNum = 0;

function nextStory() {
    storyNum++;
    var currentStory = stories[storyNum];
    if (currentStory['text']) {
        console.log(currentStory['text']);
    }
    if (currentStory['explanation']) {
        console.log(currentStory['explanation']);
    }
}

function prevStory() {
    storyNum--;
    var currentStory = stories[storyNum];
    if (currentStory['text']) {
        console.log(currentStory['text']);
    }
    if (currentStory['explanation']) {
        console.log(currentStory['explanation']);
    }
}

$(document).on('keydown', function(event) {
    if(event.keyCode == 37) {
		event.preventDefault();
		if (storyNum < stories.length) {
    		prevStory();
    	}
    }
    else if(event.keyCode == 39) {
    	event.preventDefault();
    	if (storyNum < stories.length) {
    		nextStory();
    	}
    }
});