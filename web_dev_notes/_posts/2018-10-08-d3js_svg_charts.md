---
layout: post
title:  "D3.js: Next Steps"
date:   2018-10-08 10:07:03 -0600
published: true
categories: [js, D3, WebDev]
---

So the next big steps in making charts is instead of using html elements, d3 works really well with svg elements.  But even though svg elements are a flexible for making graphics, not that many people are familiar with them so they add another level of confusion to the process.  So let's start at the beginning with what an svg element is.
## svg
[SVG or Scalable Vector Graphics](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) are a vector image file format.  If you want to know more about them you can read up on wikipedia or check out the reference on [MDN](https://developer.mozilla.org/en-US/docs/Web/SVG). For our purposes just know that SVG are extremely flexible.  For example you can make rectangles or circles using something like this:

```html
<svg viewBox = "0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g>
    <rect x="0" y="0" width="50" height="50" />
  <rect x="60" y="0" width="50" height="50" rx="15" ry="15" />
  </g>

</svg>
<svg viewBox = "0 0 100 100" xmlns="http://www.w3.org/2000/svg">
   <circle cx="25" cy="25" r="25" />

</svg>
```
