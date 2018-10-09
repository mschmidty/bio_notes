---
layout: post
title:  "D3JS First Charts"
date:   2018-10-08 10:07:03 -0600
published: false
categories: [js, D3, WebDev]
---

I've wanted to be able to use an API to retrieve data and then chart that data on the fly for quite some time.  There's only one problem: I suck at javascript and charting and making api calls on the front end requires javascript.  It also means, working with D3 if you want to do it right. Needless to say, because I am not an excellent javascript (or anything but html and css for that matter) this "dream" has been an uphill battle.  Just getting the data has been a challenge.  Needless to say, today I started working on some simple D3 charts.  It was so confusing.  This note is an attempt to go back over what I learned to try and solidify some of d3's concepts into my head.

I went through, [Let's Make a Bar Chart](https://bost.ocks.org/mike/bar/) by the creator of D3 Mike Bostock (freakin' genius).

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

The [first chart](https://bost.ocks.org/mike/bar/#manual) in the tutorial is built with vanilla html and css.  The chart is a series of `<div>` elements all with in-line css styles that signify their length or value.  The first d3 chart is a recreation of this, and it looks like this:

```html
<div class="chart"></div>
```

```js
d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { return d; });
```

So what is goin on here.  
