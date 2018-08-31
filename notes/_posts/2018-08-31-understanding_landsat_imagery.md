---
layout: post
title:  "Understanding Landsat Imagery"
date:   2018-08-31 10:07:03 -0600
categories: [landsat, GIS]
---

I've been thinking about [landsat](https://landsat.usgs.gov/) imagery. At my office we are attempting to use landsat data for drought monitoring. But I'm new to landsat data, so I thought it would be helpful to write a little explainer.

## What is Landsat?
Landsat is a joint program that was initiated by NASA but is now managed by the USGS to collect satellite imagery of earth. The program started in 1972 with the launch of Landsat1. The goal was to collect and provide arial imagery for the entire planet. Since the first launch there have been 7 more landsat satellites.  Landsat 7 and 8 are still active today. Each mission is a single satellite that takes a photograph of the entire planet once about every 16 days. The most recent satelitte Landsat 8 was launched in 2013.

## What Images are collected
Each mission has collected a variety of spectral bands of light and each collection contains a folder with a .tiff file with the following bands:

| Spectral Band                      | Wavelength       | Resolution | Solar Irradiance |
|------------------------------------|------------------|------------|------------------|
| Band 1 - Coastal / Aerosol         | 0.433 – 0.453 µm | 30 m       | 2031 W/(m²µm)    |
| Band 2 - Blue                      | 0.450 – 0.515 µm | 30 m       | 1925 W/(m²µm)    |
| Band 3 - Green                     | 0.525 – 0.600 µm | 30 m       | 1826 W/(m²µm)    |
| Band 4 - Red                       | 0.630 – 0.680 µm | 30 m       | 1574 W/(m²µm)    |
| Band 5 - Near Infrared             | 0.845 – 0.885 µm | 30 m       | 955 W/(m²µm)     |
| Band 6 - Short Wavelength Infrared | 1.560 – 1.660 µm | 30 m       | 242 W/(m²µm)     |
| Band 7 - Short Wavelength Infrared | 2.100 – 2.300 µm | 30 m       | 82.5 W/(m²µm)    |
| Band 8 - Panchromatic              | 0.500 – 0.680 µm | 15 m       | 1739 W/(m²µm)    |
| Band 9 - Cirrus                    | 1.360 – 1.390 µm | 30 m       | 361 W/(m²µm)     |
| Band 10 - Long Wavelength Infrared | 10.30 – 11.30 µm | 100 m      | NA               |
| Band 11 - Long Wavelength Infrared | 11.50 – 12.50 µm | 100 m      | NA               |

From Wikipedia:
> OLI has several different applications due to the many different bands. Band 1 is helpful in imaging shallow water resources and tracking aerosols. Bands 2, 3, and 4 are in the visible spectrum and are helpful in creating true color composite images. Band 5 is helpful for ecology purposes and can help determine vegetation index or NDVI. Bands 6 and 7 are useful in geology and can help in distinguishing different saturated and unsaturated rocks and soils. Band 8 is helpful in creating images with very high resolution and precision. Band 9 is used for detecting different types of clouds.

The last two bands are at 100m resolution and both in infrared.

## How to get the data.
There are many ways to download landsat data.  The most useful method that I have found I wrote about [here]({% post_url /notes/2018-08-13-better_way_to_work_with_LSAT %}).  It uses the command line tool `wget` and imagery stored on the Amazon AWS.

You can also use the [USGS Earth Explorer](https://earthexplorer.usgs.gov/), but when I tried it the tool was complicated and confusing.  But just in case, here is a [youtube tutorial on how to use Earth Explorer](https://www.youtube.com/watch?v=w4ZzqX5_W0o) just in case that seems like an route.

## Some helpful information
### Collection 1 Tiers
There are three tiers of landsat collection.
* **Real Time (RT)** - Available within 12 hours of collection have limited calibration.  
* **Tier 1 (T1)** - meet geometric and radiometric quality criteria, which are based on the radial root mean square error (RMSE) value of 12 meters (m) or less.
* **Tier 2 (T2)** -  have an RMSE value greater than 12 m and do not meet Tier 1 criteria.

### Imagery Tiles
Landsat imagery are collected in tiles based on World Reference System (WRS) rows and paths.  To identify you area of interests coordinate you can download a shapefile or KML [here](https://landsat.usgs.gov/pathrow-shapefiles).

### File Path Description
Every landsat file is named according to the following convention:

![landsat file specifications]({{"/assets/images/landsat/landsat_code.PNG" | absolute_url}})





## Resources
* [USGS landsat page](https://landsat.usgs.gov/)
* [USGS landsat project documentation](https://landsat.usgs.gov/project-documentation)
* [USGS Collections Fact Sheet](https://pubs.usgs.gov/fs/2018/3049/fs20183049.pdf)
* [Landsat wikipedia](https://en.wikipedia.org/wiki/Landsat_program)  
