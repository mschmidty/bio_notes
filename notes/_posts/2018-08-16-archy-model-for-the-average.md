---
layout: post
title:  "How to explain a complicated Machine Learning Process to a Non-technical Person"
date:   2018-08-16 10:07:03 -0600
categories: [R, GIS, explained]
published: true
---

This year I made a model that attempts to predict where cultural resources are likely to occur on the field office that work on for the BLM. It was the first time I had ever done anything like this and the results surprised me.   Validation showed that the model I made captures about 94% of all archaeological sites on the landscape.  I used a variety of data sources - animal migratory and concentration areas, hydrologic features, and a variety of elevation based metrics - to feed into a random forest machine learning algorithm to classify raster (grid GIS layer) pixels. But producing a model is only half the battle.  I need to explain to my managers what the model is and then I need to prove to the state agency that oversees cultural resources, SHIPO, in Colorado, that the model works and is trustworthy enough to use.

This note is an attempt at collecting my thoughts for both of these conversations.  My goal is to come up with a relatively non-complex explainer on how the model works and why we should have confidence that it is accurate enough to use.

![Example of the predictive model output]({{ "/notes/assets/arch_predict/model_example.jpg" | relative_url }})

**Figure 1.** Example of the raster output from the cultural predictive model.
{: .caption }

## What **is** the cultural predictive model and how does it work?
The cultural predictive model is a raster dataset that predicts where cultural resources are on the landscape.  What is a raster? In it's simplest form, a raster dataset is a grid of squares that covers a geographic area where each square is assigned a value.  In our case the squares are 30m x 30m and each value is a prediction from 0 to 1.  Arch site presence is assumed when a squares value is greater than 0.50.

## Where did the predictive values come from?
When we set out to make the predictive model, a group of us in the office had a hypothesis that, just like today, prehistoric inhabitants selected the locations that they lived based on a select set of topographic, hydrologic and biological attributes.  Today, we select where we live based on cost, distance to a good school, number of good jobs in the area, etc. We expected that historically inhabitants similarly looked for specific characteristics but because their needs were different, they relied more heavily on food sources and water.

### The Dataset
To test this hypothesis, the first step was to compile the data. Using GIS we created a table with all of the attributes that we thought would be valuable for predicting where people prehistorically lived. These attributes either included a value of that location (i.e. the elevation of a given location, or type of vegetation) or they included distance from a resource (i.e. distance from elk migration corridor or distance from perennial stream). An example of this table looked like this:

| Square ID | Distance  To Water | Elevation | Distance to  Elk Migration  Corridor | Slope |
|-----------|:------------------:|:---------:|:------------------------------------:|:-----:|
| Square 1  |         10         |    2500   |                  25                  |   6   |
| Square 2  |         15         |    2000   |                  50                  |   15  |
| Square 3  |          6         |    1900   |                  15                  |   20  |

Our final dataset had approximately 3.5 million squares (values/pixels). Every square had a value for the following attributes:

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
So how do we take 3 million squares and make a prediction? The key to the whole process is having 20 plus years of archaeology survey. Because we know where so many arch sites are on our field office, we can look at how far they are from a stream, how far they are from a migratory corridor, what elevation they occur at, etc.  On a simplified level this finding these values is how the model works. For each square we know what each variable value is and we also know if there is an arch site there.  

One important note though:  to train the model we just used areas that had been surveyed for arch sites.  This subset of information is critical because within the surveyed area we know where sites are located but, just as importantly, we also knew where they were not.  In other words, not only do we have all of our variable values for where arch sites are, we similarly have all of our variable values for where our sites are not.

So now that we know what data we used, let's look at an example of how this subset of information could help us figure out where arc sites are likely to occur.

### An easy example and how machine learning works
We are going to step away from our particular example so we can understand how a random forest algorithm works with a less complex example.  As discussed above, let's use purchasing a house as an example.  When people buy a house, they typically look at a bunch of factors when deciding on what to buy and where.  For this example, to keep it simple, let's look at three variables someone may consider when purchasing a house: price, distance to a good school and distance to a good park. The first step is to look look at these variables individually. Let's say we know that any house under $150,000 is more likely to be purchased and houses over $150,000 are less likely to be purchased. If we only had one variable our model would say that houses greater than 150,000 get a zero, meaning that they would not be purchased, and those under $150,000 will get a one, meaning they would get purchased. With just one variable we have made a of model of houses that are likely to be purchased. The model is too simple to be correct, but it helps us think about what houses we might want to purchase.  We know, though, that although price is an important factor in purchasing a house, it isn't the only factor and people most likely consider more than just the price of the house when purchasing a house.  For instance, if a house is close to a good school, people may be willing to purchase it for more money than they would a similar house that is further away from the good school.  So let's take a look at some of our other variables.

When considering distance to schools, we know that in general people like to live near schools.  So for this example lets say that any house within 10 miles of a school is likely to be purchased and any school outside of 10 miles is less likely to be purchased.  And finally, we know that people like to be within walking distance of a park. So we know that houses within 1 mile of a park are more likely to be purchased than houses more than a mile from a park.  

A basic model, that is more complex then our first one variable model that just looked at price, would say that the houses that are the most likely to be purchased are those that are under $150,000, within 10 miles of a school and within 1 mile of a park.  We could also assume that houses that meet 2 of the 3 criteria are a little less likely and those that meet 1 of the three are even less likely to be purchased, but all of these categories are more likely to be purchased than houses that meet none of the criteria. This is a pretty objective and rationale way to look at housing preference and it is probably pretty good at indicating what houses will likely be purchased or increase in price over time because of housing demand. But, even though this simple model would be somewhat predictive, it probably does a bad job helping us understand the nuances of humans with different wants and needs and different histories and what houses they would prefer.

With machine learning algorithms we can take advantage of relationships between variables to better understand the nuances of how people select houses and, ultimately, get a better idea of what areas are popular or will increase in price.  To understand how this works  we can look at the same example in a slightly different way.  Let's say that we know that being close to a school is the most important thing for people buying houses. Under this assumption, lets look at a $250,000 house.  Our original model says a house over $150,000 is less likely to be purchased. But we know that this isn't correct.  There is no real world scenario where housing price is so simply delineated.  Other variables must be looked at to determine what houses will be likely to be purchased at what price.  So, let's now try to incorporate two of our variables, house price and distance to schools.  Now lets take two houses, one is within 10 miles of a school and costs $250,000, the other costs $150,000 but is more than 10 miles from a school. Which house is the most likely to be purchased? If we had no historic house purchasing data, it would be really hard for us to figure this out. But, if we did have historic data would could look and ask the question: are houses that are more expensive but closer to schools more frequently purchased or are cheaper houses purchased that are further from schools. Let's say the data showed that distance to schools was really important.  Houses that are $150,000 or less could still be more likely to be purchased overall, but if a house is within 10 miles of a school, houses could still be just as likely to be purchased up to $250,000 as those houses greater than 10 miles from a school and less than $150,000.

These same principles can be applied to as many variables as we would like. For example we could look at distance to a store, average temperature, average low temperature, average high temperature, elevation, distance to a library, distance to mountains, distance to concert venue, and on and on.  Each of these variables probably has come effect on the likelihood that a house would be purchased and have some effect on house price.

But while it is easy for us to build and think about a model of likelihood of housing purchase with three variables, it becomes almost impossible to track 30 variables, or more, and their relationships. But for a computer, tracking variables and their relationships takes seconds.  And one more thing to consider is in our "easy" model we largely just arbitrarily picked values that we thought would determine house appeal. But really, how do we know what housing price exactly is the threshold for people?  We could graph house price out and make a good guess.  We could also look at the distribution of houses sold and their distance to schools and find a threshold. But it becomes harder when we want to think about these variables acting together. Without going into a ton of detail, know that this part of the process is what machine learning helps us with.  It can intelligently make a decision about where the cut off is based on the results you are looking to achieve.

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


## To wrap up
So that is essentially how machine learning and a good dataset can predict where archaeological sites are on the landscape. 
