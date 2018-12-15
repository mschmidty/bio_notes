---
layout: post
title:  "Django Getting Started"
date:   2018-12-08 10:07:03 -0600
published: true
categories: [Django, WebDev, MVC]
---

My notes on learning Django.  I'm using this [Django Tutorial](https://docs.djangoproject.com/en/2.1/intro/tutorial01/).

### Set up a virtual Environment
Find instructions to do that [here](https://docs.djangoproject.com/en/2.1/intro/contributing/#getting-a-copy-of-django-s-development-version)

You need to run:

```bash
source ~/.virtualenvs/djangodev/bin/activate
```

Every time you want to run Django.

### Create a project
`cd` to project parent folder and run:

```bash
django-admin startproject name_of_project
```

### Create app within project
```bash
python manage.py startapp polls
```

### Run a server
```bash
python manage.py runserver
```

### Start a shell for DB actions

```bash
python manage.py shell
```

### Working with URLs
* [Tutorial Basics on Views and URLs](https://docs.djangoproject.com/en/2.1/intro/tutorial03/#writing-more-views)
* [Resources](https://docs.djangoproject.com/en/2.1/topics/http/urls/)


ended here: [https://docs.djangoproject.com/en/2.1/intro/tutorial04/#use-generic-views-less-code-is-better] Might be bugs up to the top.
