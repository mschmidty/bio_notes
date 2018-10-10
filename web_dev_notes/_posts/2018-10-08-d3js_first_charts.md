---
layout: post
title:  "D3.js: Notes on my first outing"
date:   2018-10-08 10:07:03 -0600
published: false
categories: [js, D3, WebDev]
---

I've wanted to be able to use an API to retrieve data and then chart that data on the fly for quite some time.  There's only one problem: I suck at javascript and charting and making api calls on the front end requires javascript.  It also means, working with D3 if you want to do it right. Needless to say, because I am not an excellent javascript (or anything but html and css for that matter) this "dream" has been an uphill battle.  Just getting the data has been a challenge.  Needless to say, today I started working on some simple D3 charts.  It was so confusing.  This note is an attempt to go back over what I learned to try and solidify some of d3's concepts into my head.

I went through, [Let's Make a Bar Chart](https://bost.ocks.org/mike/bar/) by the creator of D3 Mike Bostock (freakin' genius). Much of the code is copied from that tutorial.  If you find this note helpful, you should check out the actual tutorial.

Before we get into charting, there's some things we need to understand about D3 on a basic level: D3 allows you to do two things: 1) make selections very easily without looping and 2) method chaining.  

## Selecting in D3

Let's say you want to make an element and then add "Hello World" to that element.  In other words you want to select an element and then do something with it. In vanilla javascript you would do the following:

```js
var div = document.createElement("div");
div.innerHTML = "Hello, world!";
document.body.appendChild(div);
```
To do the exact same thing in D3 you would do something like this:

```js
var body = d3.select("body");
var div = body.append("div");
div.html("Hello, world!");
```

Not that much better.  But lets say that we want to select a bunch of elements.  It's true that these days we could use `forEach` in javascript (but wait for the chaining), but D3 makes this really easy to using `selectAll` as well like so:

```js
var section = d3.selectAll("section");
var div = section.append("div");
div.html("Hello, world!");
```

So, even if we didn't use D3 for anything else, it makes slections really easy.  But remember that is just the start.

## Method Chaining

The second thing that you can do in d3 is method chaining.  Method chaining can be done in vanilla js, but is more common using libraries like jQuery and D3.  In D3, method chaining allow us to change, the following:

```js
var body = d3.select("body");
body.style("color", "black");
body.style("background-color", "white");

//Into This:

d3.select("body")
    .style("color", "black")
    .style("background-color", "white");
```

Selecting and Chaining are not the heart of the D3 library by a long shot, but they are important concepts to understand before you move on.

## Coding a Chart

<style>

.chart div {
  font: 10px sans-serif;
  background-color: steelblue;
  text-align: right;
  padding: 3px;
  margin: 1px;
  color: white;
}
.chart {
  margin:20px 0;
}

</style>

<div class="chart"></div>

<script src="//d3js.org/d3.v3.min.js"></script>
<script>

var data = [4, 8, 15, 16, 23, 42];

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
</script>

The [first chart](https://bost.ocks.org/mike/bar/#manual) in the tutorial is built with vanilla html and css.  The chart is a series of `<div>` elements all with in-line css styles that signify their length or value.  The first d3 chart is a recreation of this, and it looks like this:

```html
<div class="chart"></div>
```

```js
<script src="//d3js.org/d3.v3.min.js"></script>
<script>

var data = [4, 8, 15, 16, 23, 42];

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
</script>
```

So what is going on here.

### Set up
First we put a `<div>` element somewhere in the body so that we are goingg to attach the chart to later:

```html
<div class="chart"></div>
```

Then we load D3:

```js
<script src="//d3js.org/d3.v3.min.js"></script>
```
### The D3 Code

First we need to select the `html` element that we want to add the chart to:

```js
d3.select(".chart")
```
Next we want to set up d3 to create several `<div>`elements that we will add widths to.

```js
d3.select(".chart")
  .selectAll("div")
```
I didn't say this before, but because we have created a new element based on our first selection, we basically are forgetting the old selection and are now only able to work with the `.selectAll("div")`.  This is a littl confusing because you are technically making a slection of `<div>`s that don't actually exist.  Mike B. explains: *"Think of the initial selection as declaring the elements you want to exist"*.

The next step is to now to join the data to our `<div>`s that we want to exist and then append that data to our divs.  to do this, we first need to add our data with the [`data()`](https://github.com/d3/d3/wiki#data), which joins data to a selection.

> **[From the D3 Wiki](https://github.com/d3/d3-selection/blob/master/README.md#selection_data)** Joins the specified array of data with the selected elements, returning a new selection that represents the update selection: the elements successfully bound to data.

The next step is kind of confusing.  After we call `data(data)` joining our data the object "returns" both an `enter()` and `exit()` selection. In the tutorial it's described this way: "*The data operator returns the update selection. The enter and exit selections hang off the update selection, so you can ignore them if you don’t need to add or remove elements*". The next part, what we do with the `enter()` selection, I don't quite understand either so I'm going to quote the tutorial again directly:

> **[From the D3 Bar Chart Tutorial](https://bost.ocks.org/mike/bar/#automatic)** - Since we know the selection is empty, the returned update and exit selections are also empty, and we need only handle the enter selection which represents new data for which there was no existing element. We instantiate these missing elements by appending to the enter selection.

That's a lot to unpack. What I the above sudo jibberish is saying is, we use the `data()` function to join our `var data` array to our `selectAll("div")`, selection, we then use the `enter()` function to take the now joined `data(data)` and create several divs by appending each element in the `var data` array to it's own div `<div>`.

```js
d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
```

So let's step back, until this point we have really just created the number of divs as we have values in our `var data` array. If you stopped here you would have 5 divs that cross the page. But these steps are kind of critical to creating any d3 chart.  And it's really important to understand that the data created the divs based on how many there were.  That's another amazing thing about d3.

## Finishing the Chart
The next steps allow us to take our newly created `div`s and in a relative way add attributes/styles to them.

We next add a `style()` to our created `div`s with a function.  I'm not going to talk about the `styles()` attribute because using `div`s and `style`s will be jetesoned for ever after this tutorial in favor of `svg` elements and attributes `attr`.

What we are doing here, is taking our `append()`ed `div`s that are joined with our data and adding a width to each one using the `style` attribute. Each `width` will be set by `d * 10 + "px"`.  The important thing to know in this formula is the `d` value is the `var data` value that is associated with that `div`.  So given that `var data = [4, 8, 15, 16, 23, 42];` We know that our first `div` has a `d` value of 4, the second a value of 8, and so on.  The function multiplies that by 10, and adds "px" so that the width uses pixels as a unit.

```js
d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
```
Now the last step is to add text to each bar again with the `d` values.

```js
d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d){return d * 10 + "px"})
    .text(function(d){ return d })
```

## svg

In the above example, we used html and inline css to render a chart.  For a bar chart that worked great.  However, html and css are extremely limited. If we want to make anything but a bar chart, we will need to find an html element that is much more flexible.  Enter [svg or Scalable Vector Graphics](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics).  
