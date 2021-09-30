---
layout: post
title: "VS Code: Add a Rmarkdown Code Chunk Snippet to a Key Binding"
date: "2021-09-28 7:30:44 -0700"
categories: [ R, Rmd, "VS Code" ]
published: true
---

I recently started using VS code for [R](https://www.r-project.org/) development. There is an awesome new [R extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Ikuyadeu.r).  It takes a little setup, it works best radian a python package, but it works really well and there are solid instructions on the extension page. I love [Rstudio](https://www.rstudio.com/) for the most part, but I got frusterated by the lack of customization in the editor (mostly line height). So here we are.  

One thing that the the VS code R package does not have is a shortcut for adding Rmarkdown code chunks. So I thought I'd write a short how to in case other would like something similar. 

## Adding the Snippet

Go to `Code>Preferences>Keyboard Shortcuts` and then in the upper right hand corner is a small icon that looks like a piece of paper with a arrow coming around it.  If you hover on it, it says "Open Keyboard Shortcuts (JSON)". Click on the icon.  You can also press `cmd+shift+p` and type in "Keyboard Shortcuts" and select "Preferences: Open Keyboard Shortcuts (JSON)".  Edit the .json file with the following json.

```r
// Place your key bindings in this file to override the defaults
[
  {
    "key": "cmd+alt+i",
    "command": "editor.action.insertSnippet",
    "when": "editorTextFocus",
    "args": {"snippet": "```{r}\n$0\n```"}
  },
]
```

Now you can add a Rmarkdown code junk just like Rstudio with `cmd+alt+i`. 


