---
layout: post
title:  "White Paper: Random Forest Cultural Model"
date:   2018-07-31 10:07:03 -0600
categories: GIS
published: false
---
### Table of contents
1. Introduction
  * [X] What is the problem:
    * We have a ton of archaeology sites on our field office
    * Those arch sites are extremely difficult to find making the venture labor intensive and cost prohibitive.
  * [X] Part of the solution:
    - Machine learning is being used to predict where things occur.
    - Random Forests is a machine learning algorithm that is a relatively simple and powerful tool for supervised learning.
        * supervised learning is: x. **Not Included Yet**
        * random forests is x. **Not Included Yet**
    - Machine learning can help predict where we have higher probability of archaeology sites. **Not Included Yet**
    - Limitations
  * [X] Briefly what we did.
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

Federal Agencies are required by law to protect Cultural Resources.  The first step in protecting any resource is to first identify where that resource occurs on the landscape.  To identify where cultural resources occur, federal agencies typically perform in person on the ground surveys.  On the ground surveys are effective in identifying resources but are extremely time consuming. Some large projects may require multiple years of survey.

The Tres Rios Field Office is located in southwest Colorado.  It overlaps portions of Montezuma, La Plata, Archuleta, Dolores, and San Miguel Counties. Areas in Montezuma and Dolores County have some of the most archaeologically rich areas in the United States.  Many larger scale projects that are planned on the Tres Rios Field Office require extensive archaeological survey to prevent disturbance to cultural resources.  

As technology increases, Archaeological modeling is becoming a popular tool to decrease archaeological survey burdens across the US and to identify areas with high archaeological sites prior to project initiation.  In the last five years open source computer software such as [R](https://www.r-project.org/) and efforts to digitize spatial data sets have improved our ability to harness powerful predictive tools.

We used Random Forests ([randomForest package in R](https://cran.r-project.org/web/packages/randomForest/index.html)) and several state and local datasets to train a model to predict where archaeological sites occur on the Tres Rios Field Office. The model predicted archaeology sites with **####GiveFinalPrediction###** accuracy, but predicted areas without arch sites with **######Give final Accuracy######** accuracy.  This imbalance was intentional. We weighted the model by altering sample class sample sizes to over predict arch sites because for practical and legal purposes it was important to capture as many archaeological sites as possible.  **Give the out of Bag error as well somewhere**.

## Methods
We used the used [ESRI ArcMap](http://desktop.arcgis.com/en/arcmap/) geographic information system (GIS) software and the statistical computing software [R](https://www.r-project.org/) to create our model dataset.  

![Data Sources for Model]({{ "/notes/assets/arch_predict/data_sources.jpg" | relative_url }})
