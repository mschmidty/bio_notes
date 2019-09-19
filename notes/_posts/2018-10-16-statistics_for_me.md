---
layout: post
title:  "Statistics For Me"
date:   2018-10-16 10:07:03 -0600
categories: Statistics
published: true
---

I only took one statistics class in college.  It wasn't that great.  I remember the teacher telling a student that it wasn't her problem if the student didn't understand the material.  Needless to say, statistics found in most wildlife papers are way over my head. Time to change that.

I by no means am going to go over everything here.  I just want to have a good enough understanding that I can run my own stats.

## P-value
A low p-value indicates that there is strong evidence that the null hypothesis is rejected. Typically the threshold is < 0.05 (less than 0.05).  

So what does it mean to reject the null hypothesis?  When a p-value is presented you are usually comparing two populations to see if they are different.  Usually, the assumption that they are different is your hypothesis.  Your null hypothesis, therefore, is the opposite of your hypothesis. The opposite of them being different is, them being the same.  

In laymen's terms we can say that a low p-value means that it is unlikely that the two populations that we are comparing are the same.

## Regression
To understand regression two terms must be understood:
1. **dependent variable** - a variable (often denoted by y) whose value depends on that of another.  In other words, this variable changes based on the value of another variable.
2. **independent variable** - a variable (often denoted by x) whose variation does not depend on that of another. In other words, in your model, this variable will not change predictably based on the values of other variables in your model.

Typically, regression is used to understand the relationship between a dependent variable and one or more independent variables.  Most frequently, relationships are understood in a linear context (linear regression).  But relationships can also be understood using non-linear contexts.

**Linear Regression example**
![Example of a Linear regression ]({{ "/notes/assets/statistics/linear_regression.svg" | relative_url }})


## Analysis of Variance: ANOVA
ANOVA is a collection of statistical models that help you understand if two means are similar or different.  For example both a sample of (2, 2, 2, 2, 2) and (1, 1, 1, 2, 0, 7) are different (obviously).  But if we get the mean of those two datasets we will get 2 for both sets.  ANOVA helps us determine if these two datasets are significantly different in their variance or if they are similar and we just happened to just sample different numbers in each set.

Understanding this can be important for other tests, such as t-tests, because some comparative analysis only work when the compared groups have the same variance.

## T-statistic
> *"T-statistics are used in the calculation of small-sample statistics (that is, where a sample size, n, is less than or equal to 30), and take the place of the z-statistic. A t-statistic is necessary because the population standard deviation, defined as the measure of variability in a population, is not known for a small sample. T-statistics, on the other hand, allow for the use of the sample standard deviation, or s, which measures a specific sample's variation, and is more applicable to smaller-sized samples."*

[Source](https://sciencing.com/calculate-tstatistic-7213406.html)

Calculating it:
To get the inputs: Find the Sample mean ($$ \bar{x} $$), the population mean ($$ \mu $$) and the sample standard deviation (s) which is the square root of the variance ($$ \sqrt{\sigma^2}  $$).

Subtract the population mean from the sample mean ($$ \bar{x} - \mu $$). Divide the standard deviation by the square root of the number of samples ($$ s/ \sqrt{n} $$).  Take the value you got from subtracting the sample mean from the population mean, and divide it by the value you got from dividing the standard deviation the square root of n. The resulting formula is:

$$
  \frac{\bar{x} - \mu}{\frac{s}{\sqrt{n}} }
$$



## Variance

Calculate: Take a value in the sample, subtract it from the sample mean, and square the difference. Do this for each value and then add all the values together. Divide the resulting value by the number sampled minus 1 (n-1).


## References
**Wikipedia**
* [Wikipedia Statistics Page](https://en.wikipedia.org/wiki/Statistics)
* [Wikipedia Statistics Glossary](https://en.wikipedia.org/wiki/Glossary_of_probability_and_statistics)

**Books**
* [An Introduction to Statistical Learning with Applications in R](http://www-bcf.usc.edu/~gareth/ISL/)
  - [Datasets for the book](http://www-bcf.usc.edu/~gareth/ISL/data.html)
* [The Elements of Statistical Learning: Data Mining, Inference and Prediction](https://web.stanford.edu/~hastie/ElemStatLearn/printings/ESLII_print12.pdf)
  - [Datasets](https://web.stanford.edu/~hastie/ElemStatLearn/)

**YouTube**
* [Brandon Foltz Tutorials](https://www.youtube.com/user/BCFoltz)
* [Three Blue One Brown](https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw)

**Other**
* [Glossary of Statistical Terms](http://hbiostat.org/doc/glossary.pdf)
