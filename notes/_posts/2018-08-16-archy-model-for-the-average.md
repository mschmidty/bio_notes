---
layout: post
title:  "How to explain a complicated Machine Learning Process to a Non-technical Person"
date:   2018-08-16 10:07:03 -0600
categories: [R, GIS, explained]
---

This year I made a model that attempts to predict where cultural resources are likely to occur on the landscape that I work on. It worked quite well.   Validation showed that the model captures about 94% of all archaelogical sites on the landscape, while only predicting an arch site 12% of the time where there is not one.  I used a varieity of data sources - animal migratory and concentration areas, hydrologic features, and a variety of elevation based metrics - to feed into a random forest machine learning algorythm to classify a raster dataset.

Now I need to explain to my managers why they should trust it and then I need to proove to the state agency that oversees culteral resources in Colorado, that the model is, when interpreted, trusworthy.

This note is an attempt at collecting my thoughts for both of these conversations.  My goal is to come up with a relatively non-complex explainer on how the model works, why I believe it works and why we should have confidence in it.

######INPUT IMAGE OF RASTER#####

## What **is** the culteral predictive model and how does it work?
The culteral predictive model is a raster dataset that predicts where cultural resources are.  What is a raster? In it's simplist form, a raster dateset is a grid of squares where each square is assigned a value.  In our case the squares are 30m x 30m and each value is a prediction from 0 to 1 of if there is an arch site there.  Any value greater than 0.50 the model thinks has a arch site and any value with a less than 0.50 the model thinks does not have an arch site.

## Where did the predictive values come from?
When we set out to make the predictive model, a group of us in the office (archaelogist, biologist, assistant field manager, and GIS specialist) had a hypothesis that, just like today, prehistoric inhabitants of this area selected the locations that they lived based on a select set of hydrologic and biolgical attributes.  Today, we select where we live based on cost, distance to a good school, number of good jobs in the area, etc. We expected that historically inhabitants similarly looked for specific characteristics for where to live but those needs were different, relying more heavily on food sources and water.

### The Dataset
To test this hypothesis, the first step was to make a dataset. Using GIS we created a table with all of the attributes that we thought would be valuable for predicting where people prehistorically lived. An example of this table looked like this:

| Square ID | Distance  To Water | Elevation | Distance to  Elk Migration  Corridor | Slope |
|-----------|:------------------:|:---------:|:------------------------------------:|:-----:|
| Square 1  |         10         |    2500   |                  25                  |   6   |
| Square 2  |         15         |    2000   |                  50                  |   15  |
| Square 3  |          6         |    1900   |                  15                  |   20  |

Our final dataset compiled with a ton of help from our GIS, Archaeology and Wildlife staff had ~3.5 million squares that each had the following attributes:

| Topographic | Hydorlogic | Biologic |
|---------------------|----------------------|---------------------------|
| Aspect | Distance to Intermitent Stream | Distance to Bighorn Migration |
| TPI | Distance to Perenial Stream | Disance to Bighorn Summer Concentration |
| Slope |  | Distance to Bighorn Winter Concentration |
| TRI |  | Distance to Bighorn Sheep Production |
| Roughness |  | Distance To Elk Winter Concentration |
| Elevation |  | Distance to Elk Migration |
| Flow Direction |  | Distance to Elk Summer Concentration |
|  |  | Distance to Deer Winter Concentration |
|  |  | Distnace to Deer Migration |
|  |  | Distance to Turkey Production |
|  |  | Distance to Turkey Winter Concentration |

### Predicting the Arch Sites.
So how do we take 3 million squares and make a prediction? The key to the whole process is having 20 plus years of archaelogy survey.  To train the model, we took all of the data that occured within preivously surveyed areas.  This area is used for training the model because in these areas we know which areas have arch sites and which areas don't. Using machine learning, we can figure out what values of each variable are most likely to have an arch site associated with them.  We can also figure out relationships between the variables that are likely to lead to arch sites.

### An easy example
This is a pretty confusing concept to understand, so let's look at an example.  To keep it relevant lets use modern housing.  When people buy a house they typically look at a bunch of factors when deciding on what to buy.  For this example, to keep it simple lets look at three variables: price, distance to a good school and distance to a good park. Looking at these variables individually, we know that people want to buy affordable houses, so any house under $150,000 is likely to be bought, but houses over $150,000 are less likely to be bought. For distance to schools we know that people like to live within 10 miles of a good school.  So any house within 10 miles of a shool is likely to be bought and any school outside of 10 miles is less likely to be bought.  And finally, we know that people like to be within walking distance of a park. So we know that houses within 1 mile of a park are more likely to be purchased than houses more than a mile from a park.  So the houses most likely to be purchased are those that are under $150,000, within 10 miles of a school and within 1 mile of a park.  Houses that meet 2 of the 3 criteria are a little less likely, those that meet 1 of the three even less likely and 0 of the three are even more less likely. This is a pretty objective way at looking at housing preference and it is probably pretty good at indicating what houses will likely be purchased or increase in price over time.

But with machine learning algorythms we can take advantage of relationships between variables to give us a better idea of what areas are popular.  To understand this we can look at the same example in a slightly different way.  Let's say that we know that being close to a school is the most important thing for people buying houses. If a house happens to be $250,000 our original model says that that house probably won't be purchased. But let's say that using two variables, house price and distance to shools, we start to understand that those houses over $150,000 are still likely to be purchased so long as they are within 5 miles of a school.  The model also works in the other direction, housed under $150,000 are more likely to be purchased, but amoung houses that meet that criteria a those within 10 miles of the park are more likely than those outside of 10 miles.

These same principles can be applied to as many variables as we would like. For example we could look at distance to a store, average temperature, average low temperature, average high temperature, elevation, distance to a library, distance to mountains, distance to concert venue, and on and on.  But while it is easy for us to build a model of likelyhood of housing purchase with three variables, it becomes almost impossible to track 30 variables and their relationships. But for a computer, tracking those relationships takes milliseconds.  And one more thing to consider in our "easy" model is. How do we know what houseing price exactly is the threshold for people.  We could graph house price out and make a good guess.  We could also look at the distribution of houses sold and their distance to schools and find a threshold. But it becomse harder when we want to think about these varibles acting together. Without going into a ton of detail, know that this part of the process is what machine learning is for.  It can intelegently make a decsion about where the cut off is based on the results you are looking to achieve.

## How do we know that the model is correct?
So to this point we know that we gathered information for a grid of squares so that each square has a value of many variables. We know that we can use the values of the variables to find where we are likely to have arch sites and where we are not likely to have arch sites.  But how do we know that what we have predicted is correct? The answer is we validate that model by only using a portion, in this case 70%, of the data to build our model.  Remember how I said, we use only the areas that we have surveyed to build our model.  Well, in reality we only use 70% of the surveyed areas to make our model.  The remaining 30% is saved to make sure that the model that we make actually works.

## The nuts and bolts now that you know the basics.
### 1 - Step one use the known arch site locations to build a model
We take our dataset - the field office areas that have been surveyed - and add on what squares overlap with arch sites and which ones don't. We take all of the squares in this dataset and cut it randomly 70:30. The 70% is the training dataset bacues it will be used to train our model and the 30% is the testing dataset which will be used to test to see if the model we made is correct.

### 2 - Run the algorythm to build a model
We then run a Random Forest Machine Learning algorythm on our training dataset that determines which values of which variables, and their relationships, are most likely going to find an arch site. Once the computer has made these determinations we can save those attributes to be applied to any other dataset with the same variables (i.e. our testing dataset and any area with no arch survey like areas in our field office that we have not surveyed yet).

### 3 - Test the model
Now that those attributes are saved in our model we can apply them to the testing dataset.  Remember we know where the arch sites are in both the training and testing datasets. When we apply the model to the testing dataset, if it is correct - predictive - it will tell us where the arch sites are and where they are not.  If it is not predictive it will get a lot wrong. This process is where we learned that our model predicted arch sites 94% of the time.  That means when we tested it, the model did not predict an arch site for only 6% of the sites.

To be clear there was some tweeking in the middle of this process.  We used vegetation variables and soils variables and precipitation variables that didn't seem to be very predictive.  We built models at different resolutions, and 30m was the most accurate by a lot. But in a nut shell all we did was above.

### 4 - Apply to the rest of field office.
A model isn't very helpful if it only predicts areas that we have already surveyed.  The last step in the process is to apply the prediction to all areas of the field office that we have not surveyed. 
