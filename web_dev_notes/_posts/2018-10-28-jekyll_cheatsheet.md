---
layout: post
title:  "Jekyll Cheatsheet"
date:   2018-10-28 10:07:03 -0600
published: true
categories: [jekyll, WebDev]
---

For whatever reason, I don't seem to remember so many important jekyll code snippets.   This note is a list of all that I can't remember.

## Links

### Internal Links
```liquid
[my last post on this]({{ site.baseurl }}{% post_url web_dev_notes/2018-10-08-d3js_first_charts %})
```


## Images

```liquid
![Alt Text]({{ "/notes/assets/arch_predict/model_example.jpg" | relative_url }})
```
