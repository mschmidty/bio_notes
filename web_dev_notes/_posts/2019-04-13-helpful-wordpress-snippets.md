---
layout: post
title:  "Helpful Wordpress Snippets"
date:   2019-04-13 10:07:03 -0600
published: true
categories: [WebDev, Wordpress]
---
Some helpful Wordpress snippets that I am always looking up.

### Conditional formatting for if statement to isolate a page.

```php
<?php global $post; ?>

<?php if( $post->ID == 346) { ?>

      <!-- do your stuff here -->

<?php } ?>
```
