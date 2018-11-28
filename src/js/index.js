import Konva from 'konva';

var width = window.innerWidth;
var height = window.innerHeight;
console.log(width);
console.log(height);

var cellWidth = width/3;
var cellHeight = height/3;

var xpos = 0;
var ypos = 0;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

var layer = new Konva.Layer();
var imageObject = new Image();

var cell;

imageObject.onload = function() {
  var map = new Konva.Image({
    x: 0,
    y: 0,
    image: imageObject,
    width: width,
    height: height,
  });

  layer.add(map);
  for (var ix = 0; ix < width / cellWidth; ix++) {
    for (var iy = 0; iy < height / cellHeight; iy++) {
        cell = new Konva.Rect({
            x : ix * cellWidth,
            y : iy * cellHeight,
            width : cellWidth,
            height : cellHeight,
            fill : 'red',
            stroke : 'white',
            opacity: 0.5
        });
        layer.add(cell);
    }
  }
  stage.add(layer);
}
imageObject.src = "../src/img/map.png";
