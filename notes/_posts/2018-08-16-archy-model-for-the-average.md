---
layout: post
title:  "How to explain a complicated Machine Learning Process to a Non-technical Person"
date:   2018-08-16 10:07:03 -0600
categories: [R, GIS, explained]
published: true
---

This year I made a model that attempts to predict where cultural resources are likely to occur on the landscape that I work on. It worked quite well.   Validation showed that the model captures about 94% of all archaeological sites on the landscape, while only predicting an arch site 12% of the time where there is not one.  I used a variety of data sources - animal migratory and concentration areas, hydrologic features, and a variety of elevation based metrics - to feed into a random forest machine learning algorithm to classify raster (grid GIS layer) pixels.

Now, I need to explain to my managers what the model is and then I need to prove to the state agency that oversees cultural resources, SHIPO, in Colorado, that the model works and is trustworthy enough to use.

This note is an attempt at collecting my thoughts for both of these conversations.  My goal is to come up with a relatively non-complex explainer on how the model works and why we should have confidence that it is accurate enough to use.

![Example of the predictive model output]({{ "/notes/assets/arch_predict/model_example.jpg" | relative_url }})

## What **is** the cultural predictive model and how does it work?
The cultural predictive model is a raster dataset that predicts where cultural resources are.  What is a raster? In it's simplest form, a raster dataset is a grid of squares that covers a geographic area where each square is assigned a value.  In our case the squares are 30m x 30m and each value is a prediction from 0 to 1 of if there is an arch site there.  Any value greater than 0.50 the model predicts has a arch site and any value with a less than 0.50 the model predicts does not have an arch site.

## Where did the predictive values come from?
When we set out to make the predictive model, a group of us in the office (archaeologist, biologist, assistant field manager, and GIS specialist) had a hypothesis that, just like today, prehistoric inhabitants of this area selected the locations that they lived based on a select set of topographic, hydrologic and biological attributes.  Today, we select where we live based on cost, distance to a good school, number of good jobs in the area, etc. We expected that historically inhabitants similarly looked for specific characteristics for where to live but those needs were different, relying more heavily on food sources and water.

### The Dataset
To test this hypothesis, the first step was to compile the data. Using GIS we created a table with all of the attributes that we thought would be valuable for predicting where people prehistorically lived. An example of this table looked like this:

| Square ID | Distance  To Water | Elevation | Distance to  Elk Migration  Corridor | Slope |
|-----------|:------------------:|:---------:|:------------------------------------:|:-----:|
| Square 1  |         10         |    2500   |                  25                  |   6   |
| Square 2  |         15         |    2000   |                  50                  |   15  |
| Square 3  |          6         |    1900   |                  15                  |   20  |

Our final dataset compiled with a ton of help from our GIS, Archaeology and Wildlife staff, had approximately 3.5 million squares that each had the following attributes:

| Topographic | Hydrologic | Biologic |
|---------------------|----------------------|---------------------------|
| Aspect | Distance to Intermittent Stream | Distance to Bighorn Migration |
| TPI | Distance to Perennial Stream | Distances to Bighorn Summer Concentration |
| Slope |  | Distance to Bighorn Winter Concentration |
| TRI |  | Distance to Bighorn Sheep Production |
| Roughness |  | Distance To Elk Winter Concentration |
| Elevation |  | Distance to Elk Migration |
| Flow Direction |  | Distance to Elk Summer Concentration |
|  |  | Distance to Deer Winter Concentration |
|  |  | Distance to Deer Migration |
|  |  | Distance to Turkey Production |
|  |  | Distance to Turkey Winter Concentration |

### Predicting the Arch Sites.
So how do we take 3 million squares and make a prediction? The key to the whole process is having 20 plus years of archaeology survey. Because we know where so many arch sites are on our field office, we can look at how far they are from a stream, how far they are from a migratory corridor, what elevation they occur at, etc.  To build a simple model, we could pick three or four attributes that most predicted arch sites, then determine what values those attributes have at arch sites and then make a model out of the results, essentially having a map with two colors, one color representing where arch sites are and one representing where arch sites are not.  But that model, would undoubtedly (we tried at the beginning) have a large error.  After all, predicting human habitation is complex. But back to the model we actually built.

To train the model, we took all of the data that occurred within previously surveyed areas.  This area is used for training the model because in these areas we know which areas have arch sites and which areas don't.  Most models rely on a dataset where you know the answers.  In this case, the answers are where arch sites occur and where they don't occur. Using machine learning, we can figure out what values of each variable (attribute) are most likely to have an arch site associated with them.  We can also use relationships between the variables to help us predict where arch sites are.

### An easy example and how machine learning works
This is a pretty confusing concept to understand, so let's look at an example.  To keep it relevant lets use modern housing.  When people buy a house they typically look at a bunch of factors when deciding on what to buy and where.  For this example, to keep it simple, lets look at three variables someone may consider when purchasing a house: price, distance to a good school and distance to a good park. Looking at these variables individually, we know that people want to buy affordable houses, so for this example we will say that any house under $150,000 is likely to be bought and houses over $150,000 are less likely to be bought. When considering distance to schools, we know that people like to live within 10 miles of a good school.  So for this example lets say that any house within 10 miles of a school is likely to be bought and any school outside of 10 miles is less likely to be bought.  And finally, we know that people like to be within walking distance of a park. So we know that houses within 1 mile of a park are more likely to be purchased than houses more than a mile from a park.  

A very basic model would say that the houses that are the most likely to be purchased are those that are under $150,000, within 10 miles of a school and within 1 mile of a park.  We could also assume that houses that meet 2 of the 3 criteria are a little less likely and those that meet 1 of the three are even less likely to be purchased, but all of these categories are more likely to be purchased than houses that meet none of the criteria. This is a pretty objective way at looking at housing preference and it is probably pretty good at indicating what houses will likely be purchased or increase in price over time. But, even though this simple model would be somewhat predictive, it probably does a bad job of understanding the nuances of purchasing houses.

With machine learning algorithms we can take advantage of relationships between variables to better understand the nuances of how people select houses and, ultimately, get a better idea of what areas should be popular.  To understand how this works in we can look at the same example in a slightly different way.  Let's say that we know that being close to a school is the most important thing for people buying houses. If a house happens to be $250,000 our original model says that that house probably won't be purchased. But let's say that using two variables, house price and distance to schools, we start to understand that those houses over $150,000 are still likely to be purchased so long as they are within 5 miles of a school.  That is the most basic form of a variable relationship. If we just look at one independent variable, house price, it would say that houses that are over $150,000 are less likely to be purchased.  However, looking at housing price and distance to school, we know that houses up to $250,000 are desireable so long as they are within 5 miles of a school. The model also works in the other direction, housed under $150,000 are more likely to be purchased, but among houses that meet that criteria are those within 10 miles of the park are more likely than those outside of 10 miles.

These same principles can be applied to as many variables as we would like. For example we could look at distance to a store, average temperature, average low temperature, average high temperature, elevation, distance to a library, distance to mountains, distance to concert venue, and on and on.  

But while it is easy for us to build a model of likelihood of housing purchase with three variables, it becomes almost impossible to track 30 variables, or more, and their relationships. But for a computer, tracking variables and their relationships takes seconds.  And one more thing to consider is in our "easy" model we largely just arbitrarily picked values that we thought would determine house appeal. But really, how do we know what housing price exactly is the threshold for people?  We could graph house price out and make a good guess.  We could also look at the distribution of houses sold and their distance to schools and find a threshold. But it becomes harder when we want to think about these variables acting together. Without going into a ton of detail, know that this part of the process is what machine learning helps us with.  It can intelligently make a decision about where the cut off is based on the results you are looking to achieve.

## How do we know that the model is correct?
So to this point we know that we gathered information for a grid of squares so that each square has a value of many variables. We know that we can use the values of the variables to find where we are likely to have arch sites and where we are not likely to have arch sites.  But how do we know that what we have predicted is correct? The answer is we validate that model by only using a portion, in this case 70%, of the survey area to build our model.  Remember how I said, we use only the areas that we have surveyed to build our model.  Well, in reality we only use 70% of the surveyed areas to make our model.  The remaining 30% is saved to make sure that the model that we make actually works. Once we generate the model, we can apply it to the 30% that we saved to see how accurate it is at predicting those areas.

## The nuts and bolts now that you know the basics.
### 1 - Step one use the known arch site locations to build a model
We take our dataset - the field office areas that have been surveyed - and add on what squares overlap with arch sites and which ones don't.

| Square ID | Distance to  Water | Elevation | Aspect | ETC for ~20 Variables | Has Known Arch Site |
|-----------|--------------------|-----------|--------|-----------------------|---------------------|
| 1 | 200 | 2000 | N | ... | Yes |
| 2 | 400 | 9000 | NE | ... | No |
| 3 | 700 | 7600 | W | ... | No |
| 4 | 100 | 4200 | S | ... | Yes |
| n<sup>x</sup> | etc.  | etc.  | etc.  | ... | etc. |

We take the dataset, which looks like the one above, and cut it randomly 70:30. The 70% is the training dataset because it will be used to train our model and the 30% is the testing dataset which will be used to test to see if the model we made is correct.

### 2 - Run the algorithm to build a model
We then run a Random Forest Machine Learning algorithm on our training dataset that determines which values of which variables, and their relationships, are most likely going to find an arch site. Once the computer has made these determinations we can save those attributes to be applied to any other dataset with the same variables (i.e. our testing dataset and any area with no arch survey like areas in our field office that we have not surveyed yet).

### 3 - Test the model
Now that those attributes are saved in our model we can apply them to the testing dataset.  Remember we know where the arch sites are in both the training and testing datasets. When we apply the model to the testing dataset, if it is correct - predictive - it will tell us where the arch sites are and where they are not.  If it is not predictive it will get a lot wrong. This process is where we learned that our model predicted arch sites 94% of the time.  That means when we tested it, the model did not predict an arch site for only 6% of the sites.

And we now have a table that looks like this:

| Square ID | Distance to  Water | Elevation | Aspect | ETC for ~20 Variables | Has Known Arch Site | Model Predicted |
|-----------|--------------------|-----------|--------|-----------------------|---------------------|-----------------|
| 1 | 200 | 2000 | N | ... | Yes | Yes - Arch Site |
| 2 | 400 | 9000 | NE | ... | No | No |
| 3 | 700 | 7600 | W | ... | No | No |
| 4 | 100 | 4200 | S | ... | Yes | Yes - Arch Site |
| n^x | etc.  | etc.  | etc.  | ... | etc. | etc. |

To be clear there was some tweaking in the middle of this process.  We used vegetation variables and soils variables and precipitation variables that didn't seem to be very predictive.  We built models at different resolutions, and 30m was the most accurate by a lot. But in a nut shell all we did was above.

### 4 - Apply to the rest of field office.
A model isn't very helpful if it only predicts areas that we have already surveyed.  The last step in the process is to apply the prediction to all areas of the field office that we have not surveyed.
