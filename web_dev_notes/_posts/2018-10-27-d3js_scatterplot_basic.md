---
layout: post
title:  "D3.js: Basic ScatterPlot"
date:   2018-10-27 10:07:03 -0600
published: true
categories: [js, D3, WebDev]
---
I've made a few bar charts up to this point.  But really what I want to do is plot data over time.  We need to figure out how to add x and y axis and work with x and y coordinates.  The next logical step then, is to make a scatterplot.

{% include d3/scatterplot/scatterplot_basic.html %}

## A series of Steps
I'm beginning to lear that making anything is a series of steps in D3.  It doesn't really help you with the individual steps, but it does help you with lots of things to complete each step.

## Some takeaways

The axis are really pretty easy. But what's different is that you make a main `<g>` and then add axis to the main.

I didn't really know how to style the axis.  One big thing is that the axis look really fat until you apply a `fill:none;` either directly to the axis or in css.

I'm kind of struggling with the `cx` and `cy`.  I don't really understand how you just ask for the scale and then the corrisponding columns.  That is a bit confusing.  But other than that I think I get it. 

```html
<style>

.main text {
    font: 10px sans-serif;
}

.axis line, .axis path, path {
    shape-rendering: crispEdges;
    stroke: black;
    fill: none;
}
.domain{

}

circle {
    fill: steelblue;
}

</style>
<svg class="scatterplot"></svg>
<script src="https://d3js.org/d3.v3.min.js"></script>
<script>
  var data = [
    [5, 3],
    [10, 17],
    [15, 4],
    [2, 8]
  ];
  var margin = { top: 20, right: 15, bottom: 60, left: 60  },
    width = 680 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {
      return d[0];
    })])
    .range([0, width]);

  var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {
      return d[1];
    })])
    .range([height, 0])

  var chart = d3.select('.scatterplot')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom);

  var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.right +')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main')

  //Draw the x and y axis.
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')

  main.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'main axis date')
    .call(xAxis);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')

  main.append('g')
    .attr('transform', 'translate(0,0)')
    .call(yAxis);

// Draw the X and Y Coordinates
  var g = main.append("svg:g")
    .attr("class", "added");

  g.selectAll("scatter-dots")
    .data(data)
      .enter().append("svg:circle")
        .attr("cx", function(d){ return x(d[0]);})
        .attr("cy", function(d){return y(d[1]);})
        .attr('r', 15)
        .attr('fill', 'steelblue')
        .attr('stroke', 'black');

</script>


```
