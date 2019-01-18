import data from './libs/data.json';

let matrixData = data;
var interaction = {
    updateStory: function(storyNum, stories) {
        console.log(storyNum);
        var currentStory = stories[storyNum];
        
        // removing previous elements if they existed
        var existingTitle = document.getElementById('title');
        var existingExplanation = document.getElementById('explanation');
        var existingImage = document.getElementById('image');
        var existingDiv = document.getElementsByClassName('panel');
        if (existingTitle) {
            existingTitle.parentNode.removeChild(existingTitle);
        }
        if (existingExplanation) {
            existingExplanation.parentNode.removeChild(existingExplanation);
        }
        if (existingImage) {
            existingImage.parentNode.removeChild(existingImage);
        }
        if (existingDiv) {
            $('.panel').remove();
        }
    
        // creating new elements
        var gridID = document.getElementById('grid');
        var title = document.createElement('h1');
        title.id = 'title';
        var explanation = document.createElement('p');
        explanation.id = 'explanation';
        var image = document.createElement('img')
        image.id = 'image';
        // title and explanation, but no image and no canvas
        if (currentStory['title'] && !currentStory['image'] && !currentStory['canvas']) {
            //title
            gridID.appendChild(title);
            title.innerHTML = currentStory['title'];
            // explanation
            if (currentStory['explanation']) {
                gridID.appendChild(explanation);
                explanation.innerHTML = currentStory['explanation'];
            }
        }
        // title and image
        if (currentStory['title'] && currentStory['image']) {
            // title
            gridID.appendChild(title);
            title.innerHTML = currentStory['title'];
            // explanation
            if (currentStory['explanation']) {
                gridID.appendChild(explanation);
                explanation.innerHTML = currentStory['explanation'];
            }
            gridID.appendChild(image);
            image.setAttribute('src', currentStory['image']);
        }
        // image, but no title
        if (currentStory['image'] && !currentStory['title']) {
            grid.appendChild(image);
            image.setAttribute('src', currentStory['image']);
        }
        if (currentStory['canvas']) {
            for (var i = 0; i < currentStory['canvas'].length; i++) {
                var panel = document.createElement('div');
                var config = currentStory['canvas'][i];
                panel.id = config['containerID'];
                panel.className = 'panel';
                config['data'] = matrixData;
                config['height'] = 1000;
                config['width'] = 1000;
                gridID.appendChild(panel);
            }
        }
    }
}
export default interaction;