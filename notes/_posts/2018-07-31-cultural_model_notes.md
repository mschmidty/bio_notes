---
layout: post
title:  "Final Cultural Prediction Model Notes"
date:   2018-07-31 10:07:03 -0600
categories: GIS
---

The purpose of this note is to document my process for creating a model that predicts where archaeological sites are more likely to occur on our field office. You can find my R scripts [here]({{site.baseurl}}{% link r/_posts/2018-08-01-30m_sripts_For_cultural_prediction_model.md %}).

The short version:
* Our base dataset was known arch site locations.
* These known locations were compared with all areas that had been surveyed for arch sites.
* Surveyed areas, clipped  within our field office, were used as the training dataset.
* Areas outside of the survey area were the areas that we would eventually predict.
* Within the survey area we created a dataset that had an x and y coordinate which represented the center point of our base rasters, as well as all variables listed below.
* The variables we used for predicting where arch sites would be, consisted of:
  1. **Biological data** - Distance to elk, Deer and Pronghorn severe winter range, winter concentration areas, migratory corridors and production areas; and turkey concentration areas [Source: Colorado Parks and Wildlife](https://data.colorado.gov/Environment/All-Colorado-Parks-and-Wildlife-Species-Activity-M/7ijd-4q29/data).
  2. **Topographic data** - Elevation, slope, flow direction, terrain ruggedness index (TRI), topographic position index (TPI), and roughness were all calculated using a 30m digital elevation model (DEM) and the [terrain function](https://www.rdocumentation.org/packages/raster/versions/2.6-7/topics/terrain) from the r [raster](https://www.rdocumentation.org/packages/raster/versions/2.6-7) package.
  3. **Hydrologic Data** - Distance to perennial and intermittent streams using Colorado Division of Wildlife 24K streams data (no longer available)** .
  4. **Other Datasets** - I attempted to use a few other datasets like landfire biophysical setting and soils data, but the variables in both datasets that had few enough categories (Random Forest can't handle factors with more than 32 levels/categories) were too generalized to help the model. I would assume that soil type would have helped the model, but there were too many categories (n>100) for me to use them.








** This dataset anecdotally seemed to most accurately represent actual hydrology on the ground.
