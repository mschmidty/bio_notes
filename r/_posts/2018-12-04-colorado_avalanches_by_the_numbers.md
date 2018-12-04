---
layout: post
title:  "Colorado Avalanches By The Numbers in R"
date:   2018-11-20 10:07:03 -0600
categories: R
---

A few plots I made looking at avalanches in Colorado.  Please not I'm not an avalanche expert, so please take these interpretations with skepticism.

### Avalanche Observations by Aspect
![Observed Avalanches by Aspect]({{"/r\assets\avalanches\colorado_avalanches_by_aspect_2.jpeg" | relative_url }})

North to southeast facing slopes appear to be the most dangerous aspects.  This confirms what we know:  snow layers that are not exposed to the sun tend to develop persistent week layers.  However it is important to note that every aspect is susceptible to slide.

### Avalanche Observations by Elevation
![Observed Avalanches by Elevation]({{"/r\assets\avalanches\colorado_avalanches_by_elevation.jpeg" | relative_url }})

The vast majority of avalanches occur above tree line.  Elevations at or below tree line have a similar number of avalanches. Avalanches happen at all elevations.  It would be interesting to know if there were better bins for elevations.  I wonder if areas well below tree line have fewer avalanches?

### Avalanche Observations by Mountain Range
![Observed Avalanches by Mountain Range]({{"/r\assets\avalanches\colorado_avalanches_by_range_2.jpeg" | relative_url }})

The Northern San Juan are twice as dangerous as any other mountain range in Colorado.  It would be better if we could look at this in context of area.  The North San Juan is also probably the biggest range as Colorado Avalanche Information Center describes it.  The Front Range and Vial and Summit County also experience many Avalanches. The Front Range is similar in size to the North San Juan so you could infer that the San Northern Juans are more susceptible to avalanches than the Front Range.  Vail and Summit county, on the other hand, is less than half the size of Northern San Juan.  You could infer that Vail may be as susceptible to avalanches as the Northern San Juan.  And all of this info should probably be ignored because of reporting bias in the sample.  Far more people live in the Vail and Summit County areas than there live in the Northern San Juans. Also, area visibility could be a factor we cannot control for.  So don't read too much into this analysis.

### The Takeaway
Avalanches can occur in all mountain ranges in Colorado, on all aspects, at all elevations.  

Be safe out there.

## The Scripts
For the most up to date scripts check out the repo: [avalanche_analysis](https://github.com/mschmidty/r_projects2/tree/master/avalanche_caic)
```r
library(tidyverse)
data<-read_csv("https://raw.githubusercontent.com/mschmidty/r_projects2/master/avalanche_caic/CAIC_avalanches_1981-11-01_2018-12-02.csv")
```

## Aspect Graph

```r
data%>%
  filter(Asp!="All", Asp!= "Unknown", Asp!="U")%>%
  group_by(Asp)%>%
  summarize(perc=n())%>%
  arrange(desc(perc))%>%
  ggplot(aes(x=reorder(Asp,perc), y=perc))+
    geom_bar(stat="identity", fill="#5089E8", width=0.8,position = position_dodge(width=0.2) )+
    coord_flip()+
    theme_classic()+
    xlab("")+
    ylab("")+
    labs(title="Colorado Avalanches by Aspect",
         subtitle = "Reported Avalanches in Colorado From 1981 through the winter of 2017",
         caption = "Data From Colorado Avalanche Information Center")+
    theme(axis.line.y=element_blank(),
          axis.ticks.y=element_blank(),
          text=element_text( family="Source Sans Pro", size=16),
          plot.title=element_text(face="bold"),
          plot.subtitle=element_text(size=12, color="#555555", family="Source Sans Pro Light"),
          plot.caption=element_text(size=12, color="#555555"),
          plot.background = element_rect(fill = "#f9f9f9"),
          panel.background = element_rect(fill="#f9f9f9"))
```
### Elevation Chart
```r
positions <- c("Above Treeline", "Near Treeline", "Below Treeline")
data%>%
  filter( Elev!="All", Elev!="U")%>%
  mutate(Elev_long = ifelse(Elev==">TL", "Above Treeline", ifelse(Elev=="<TL", "Below Treeline", "Near Treeline")))%>%
  group_by(Elev_long)%>%
  summarize(perc=n())%>%
  arrange(desc(perc))%>%
  ggplot(aes(x=Elev_long, y=perc))+
    geom_bar(stat="identity", fill="#5089E8", width=0.8,position = position_dodge(width=0.2) )+
    coord_flip()+
    scale_x_discrete(limits = positions)+
    theme_classic()+
    xlab("")+
    ylab("")+
    labs(title="Colorado Avalanches By Elevation Range",
         subtitle = "Reported Avalanches in Colorado From 1981 through the winter of 2017",
         caption = "Data From Colorado Avalanche Information Center")+
    theme(axis.line.y=element_blank(),
          axis.ticks.y=element_blank(),
          text=element_text( family="Source Sans Pro", size=16),
          plot.title=element_text(face="bold"),
          plot.subtitle=element_text(size=12, color="#555555", family="Source Sans Pro Light"),
          plot.caption=element_text(size=12, color="#555555"),
          plot.background = element_rect(fill = "#f9f9f9"),
          panel.background = element_rect(fill="#f9f9f9"))
```

### Range Chart
```r
data%>%
  rename(Zone=6)%>%
  filter(Zone!=is.na(Zone))%>%
  group_by(Zone)%>%
  summarize(perc=n())%>%
  arrange(desc(perc))%>%
  ggplot(aes(x=reorder(Zone, perc), y=perc))+
    geom_bar(stat="identity", fill="#5089E8", width=0.8,position = position_dodge(width=0.2) )+
    coord_flip()+
    theme_classic()+
    xlab("")+
    ylab("")+
    labs(title="Colorado Avalanches by Range",
         subtitle = "Reported Avalanches in Colorado From 1981 through the winter of 2017",
         caption = "Data From Colorado Avalanche Information Center")+
    theme(axis.line.y=element_blank(),
          axis.ticks.y=element_blank(),
          text=element_text( family="Source Sans Pro", size=16),
          plot.title=element_text(face="bold"),
          plot.subtitle=element_text(size=14, color="#555555", family="Source Sans Pro Light"),
          plot.caption=element_text(size=12, color="#555555"),
          plot.background = element_rect(fill = "#f9f9f9"),
          panel.background = element_rect(fill="#f9f9f9"))
```
