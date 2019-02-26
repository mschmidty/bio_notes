---
layout: post
title: "Random Forest Resources and Notes"
date: "2019-02-26 16:30:44 -0700"
categories: [ machine learning, R ]
---

Resources for random forests.

* [Class imbalance](https://shiring.github.io/machine_learning/2017/04/02/unbalanced)
  - Two methods for handling class imbalances. 1) under-sampling - only using a subset of the class with more observations. 2) oversampling - randomly duplicate the class with fewer observations.  
  - Uses caret package to perform cross validation.
  - On why class imbalancing is a problem: *"assume we had 10 malignant vs 90 benign samples. A machine learning model that has been trained and tested on such a dataset could now predict “benign” for all samples and still gain a very high accuracy. An unbalanced dataset will bias the prediction model towards the more common class!"*
* [Explaining Black-Box Machine Learning Models - Code Part 1: tabular data + caret + iml](https://shirinsplayground.netlify.com/2018/07/explaining_ml_models_code_caret_iml/), [Explaining Black-Box Machine Learning Models - Code Part 2: Text classification with LIME](https://shirinsplayground.netlify.com/2018/07/explaining_ml_models_code_text_lime/) & [Explaining Keras image classification models with lime](https://shirinsplayground.netlify.com/2018/06/keras_fruits_lime/)
