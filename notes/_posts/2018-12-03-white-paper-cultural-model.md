---
layout: post
title:  "White Paper: Random Forest Cultural Model"
date:   2018-07-31 10:07:03 -0600
categories: GIS
---
### Table of contents
1. Introduction
  * What is the problem:
    * We have a ton of archaeology sites on our field office
    * Those arch sites are extremely difficult to find making the venture labor intensive and cost prohibitive.
  * Part of the solution:
    - Machine learning is being used to predict where things occur.
    - Random Forests is a machine learning algorithm that is a relatively simple and powerful tool for supervised learning.
        * supervised learning is: x.
        * random forests is x.
    - Machine learning can help predict where we have higher probability of archaeology sites.
    - Limitations
  * Briefly what we did.
2. Methods
  * Data Sources
  * Random Forest Package
  * Tuning Processes
  * Validation: Computer
  * Validation: On the ground
  * Evaluation of Results
3. Results
  * Accuracy
  * Most predictive variables
4. Discussion
  * Limitations of the model
  * Limitations of actually using
  * How I think it should be used
  * Moving forward to refinement


## Introduction
### The Problem

Federal Agencies are required by law to protect Cultural Resources.  The first step in protecting any resource is to first identify where that resource occurs on the landscape.  To identify where cultural resources occur, federal agencies typically perform in person on the ground surveys.  On the ground surveys are effective in identifying resources but, for larger projects, can be extremely time consuming.

The Tres Rios Field Office is located in southwest Colorado.  It overlaps portions of Montezuma, La Plata, Archuleta, Dolores, and San Miguel Counties. Areas in Montezuma and Dolores County are some of the most archaeologically dense areas in the United States.  Many larger scale projects the are planned on the Tres Rios Field Office require extensive archaeological survey to prevent disturbance to cultural resources.  

Archaeological modeling is becoming a popular tool to decrease archaeological survey burdens across the US and to identify areas with high archaeological sites prior to project initiation.  In the last five years open source computer software and efforts to digitize spatial data sets have improved access to powerful predictive tools.

We used Random Forests ([randomForest package in R](https://cran.r-project.org/web/packages/randomForest/index.html)) and several local datasets to train model to predict where archaelogical sites occur on the Tres Rios Field Office.
