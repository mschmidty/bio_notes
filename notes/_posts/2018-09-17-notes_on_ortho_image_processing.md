---
layout: post
title:  "Processing Ortho Imagery"
date:   2018-09-17 10:07:03 -0600
categories: GIS
published: true
---

We just purchased 0.2 m four band aerial imagery that covers all Gunnison sage-grouse critical habitat.  This is the first time I have ever received raw aerial imagery.  We have been working on doing some ground truething of a set of polygons so that we can classify imagery into a variety of vegetation classes (sagebrush/non-sagebrush, sagbrush density classes, etc.)  

These are my notes on working with a new data format and a task list of what we need to do to make the data we have useful.

## First Look

After just receiving the raw imagery, it's amazing how detailed the imagery is. There are a few problems thought that I have noticed:

### Many Geographically Small Images
The imagery comes in many very large .tiff's.  For instance, one of our populations has about 35 separate images. Considering we want to classify vegetation over the whole area, we will need to stitch the images together before we can work with them.

### Color Correction Needed
The images are very different color wise.  Which means we will have to do some sort of color correction before we can actually perform a classification.  

## Resources
* [Color adjustment of orthophotos](http://etd.dtu.dk/thesis/258828/ep10_09_net.pdf) - This resource has a particularly helpful section on color correction.
