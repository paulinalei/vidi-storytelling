import Konva from 'konva';
import * as d3 from 'd3';
import {legendColor, legendSize} from 'd3-svg-legend';
import sst from './sst.json';

var svg = d3.select("svg");

var steps = 4;
var colorScale = d3.scaleQuantize()
  .domain([18, 14])
  .range(d3.schemeRdBu[steps]);

var colorLegend = legendColor()
  .labelFormat(d3.format(".2f"))
  .scale(colorScale)
  .shapePadding(0)
  .shapeWidth(30)
  .shapeHeight(30)
  .labelOffset(10);

svg.append("g")
  .attr("transform", "translate(65, 10)")
  .call(colorLegend);

var width = window.innerWidth;
var height = window.innerHeight;

var cellWidth = width/10;
var cellHeight = height/10;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

var layer = new Konva.Layer();
var imageObject = new Image();

var cell;

var tempData = [[17.2802, 17.217, 16.9556, 16.6666, 16.4058, 16.4381, 16.5967, 16.9258, 17.3752, 16.96], [17.223, 17.192, 16.9072, 16.5934, 16.3423, 16.348, 16.3659, 16.5869, 17.9886, 0.0], [17.0359, 17.0607, 16.8071, 16.4699, 16.2304, 16.1992, 16.2619, 16.3804, 0.0, 0.0], [16.8095, 16.8419, 16.5346, 16.181, 16.0412, 16.1463, 16.7503, 16.3887, 0.0, 0.0], [16.4613, 16.4386, 16.1466, 15.8816, 15.8496, 16.1273, 18.9665, 0.0, 0.0, 0.0], [16.0916, 15.927, 15.6708, 15.5179, 15.7461, 16.4605, 19.0603, 0.0, 0.0, 0.0], [15.6695, 15.393, 15.216, 15.2685, 15.8204, 17.3122, 18.3505, 0.0, 0.0, 0.0], [15.521, 15.1218, 14.8655, 14.9251, 15.222, 0.0, 0.0, 0.0, 0.0, 0.0], [15.4584, 14.9795, 14.4957, 14.5765, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], [15.6722, 15.2392, 14.3217, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]]

imageObject.onload = function() {
  var map = new Konva.Image({
    x: 0,
    y: 0,
    image: imageObject,
    width: width,
    height: height,
  });

  layer.add(map);
  for (var ix = 0, lat = tempData.length - 1; ix < width / cellWidth, lat >= 0; ix++, lat--) {
    for (var iy = 0, lon = tempData[0].length - 1; iy < height / cellHeight, lon >= 0; iy++, lon--) {
        var color = (tempData[lat][lon] == 0.0) ? 'black':colorScale(tempData[lat][lon]); 
        cell = new Konva.Rect({
            x : ix * cellWidth,
            y : iy * cellHeight,
            width : cellWidth,
            height : cellHeight,
            fill : color,
            stroke : 'white',
            opacity: 0.5
        });
        layer.add(cell);
    }
  }
  stage.add(layer);
}
imageObject.src = "../src/img/map3.png";


