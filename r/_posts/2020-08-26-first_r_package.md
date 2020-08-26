---
layout: post
title: "First R Package"
date: "2020-08-26 7:30:44 -0700"
categories: [ R, package ]
published: true
---

I've been trying to participate in [#tidytuesday](https://github.com/rfordatascience/tidytuesday).  While making plots I found myself consistantly repeating the same `theme()` attributes for each plot.  To solve this repetition, I decided to produce a package with my own theme. 

The following is the very basics of how to make package with a very minimal theme for personal use.  The focus will be on making a package  and not on theme development.  This also assumes you are using [Rstudio](https://rstudio.com/products/rstudio/#rstudio-desktop) as your IDE. When we are done you should have a package that you can load into any R script by running `library(packageName)`. 

## Getting started with your first package
To start your package, in Rstudio go to "File">"New Project" and the "New Project Wizard" dialogue box should appear. 

![Photo of New Project Wizard]({{"/r/assets/package/new_project_wizard.JPG" | relative_url }})

Select "New Directory" and then "R Package". Fill in the package name and select "Create Project".

![Photo of Create Project Steps]({{"/r/assets/package/package_create.JPG" | relative_url }})

Rstudio creates a full fledged package for you.  

## What's in a package

```bash
├─ .Rbuildignore 
├─ projectName.Rproj 
├─ DESCRIPTION
├─ man/
│   └─hello.Rd
├─ NAMESPACE
├─ R/
│   └─hello.R
```

For now, talking about packages on a really basic level, the only files we need to care about are the `.R` files in the `R/` folder. It is a good idea to add documentation to your package, but for now, to keep things simple we are going to ignore documentation. 

## Adding a function to your package
To add a function to our package create a new `.R` file in your `R/` folder. I will name mine `theme.R`.  Within the file I am going to save a simple theme: 

```r
background_color<-"#f9f9f9"

theme_schmidt <- function () {
  theme_minimal() %+replace%
    theme(
      plot.margin = margin(20, 20, 20, 20),
      plot.background = element_rect(fill=background_color),
      panel.background = element_blank(),
      panel.grid.major.x = element_blank(),
      panel.grid.major.y = element_blank(),
      panel.grid.minor.x = element_blank(),
      axis.line=element_blank(),
      axis.ticks.y = element_blank(),
      axis.text = element_text(size = 9),
      axis.title = element_text(size=11, color="#888888"),
      plot.title = element_text(size = 12,
                                color="#333333",
                                face="bold",
                                margin = margin(10, 0, 3, 0)),
      plot.subtitle = element_text(size = 8,
                                   color = "#888888",
                                   face = "italic"),
      plot.caption = element_text(size=8,
                                  color = "gray50",
                                  margin = margin(10, 0, 0, 0),
                                  hjust=1)
    )
}
```
The file has one function `theme_schmidt()`.  

## Adding the theme to library()
To add any package to your library save all open work and press `cmd`+`shift`+`B`.  Rstudio will compile your package and add it to your library.  Now whenever you want to use your new theme you just have to call `library(packageName)` and then `theme_set(theme_schmidt())` will be ready to use. 

## Resource
* [R Packages by Hadley Wickham](https://r-pkgs.org/)