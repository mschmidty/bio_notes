---
layout: large_image_post
title: "Wildfires in the West"
date: "2020-08-27 7:30:44 -0700"
categories: [ R, ggplot ]
published: true
---
{::nomarkdown}
<img class="large-header-image" src="{{"/r/assets/maps/Wildfires_in_the_west.png" | relative_url }}">
{:/nomarkdown}

The second largest fire in Colorado's History is currently burning.  California is also having a historic fire season.  

I wanted to see what that looks like on the landscape so I plotted all of the wildfires currently burning in the west. Surprisingly many fires are visible when plotted on a westwide scale. 

## R
```r
library(tidyverse)
library(geojsonio)
library(sf)
library(rnaturalearth)
library(schmidtytheme)


theme_set(theme_schmidt()+
            theme(
              panel.grid.major = element_line(colour = "transparent")
            ))


wildfires<-geojson_read("https://opendata.arcgis.com/datasets/5da472c6d27b4b67970acc7b5044c862_0.geojson", what="sp")%>%
  st_as_sf()

usa <- ne_states(country="united states of america", returnclass="sf")

colorado<-usa%>%
  filter(name=="Colorado")

the_west<-usa%>%
  filter(name %in% c("California", "Oregon", "Washington", "New Mexico", "Arizona", "Nevada", "Idaho", "Wyoming","Montana", "Utah", "Colorado"))
  

ggplot()+
  geom_sf(data=the_west, fill="#333333", color="#efefef")+
  geom_sf(data = wildfires, fill="#FF6A5D", color=NA)+
  coord_sf(xlim = c(-125, -101), ylim = c(30, 50), expand = FALSE)+
  labs(
    title = "Wildfires Burning in the West",
    x="",
    y="",
    subtitle="Date:8/27/2020",
    caption="@mschmidty | Data: National Inter Agency Fire Center"
  )+
  theme(
    plot.background=element_rect(fill = "transparent", colour = NA),
    axis.text=element_blank(),
    panel.border=element_blank(),
    axis.line=element_blank(),
    plot.title=element_text(size=20)
  )+
  ggsave("Wildfires_in_the_west.png", h=11, w=11, type="cairo")
  ```

  I also was curious to see how much fire activity has increased in the united states. 

  ![Column Chart showing increasing wildland fire activity over the last century.]({{"/r/assets/plots/wildland_fire_total_number_of_acres.png" | relative_url }}){:.wide-image}