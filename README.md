# Artistry

[![Build Status](https://travis-ci.org/sjohnsonaz/artistry.svg?branch=master)](https://travis-ci.org/sjohnsonaz/artistry) [![npm version](https://badge.fury.io/js/artistry.svg)](https://badge.fury.io/js/artistry)

A powerful and configurable stylesheet

Artistry is a collection of commonly used widget styles, such as buttons, modals, tabs, etc.  Each has been designed to work together seamlessly and efficiently.  It is also designed to work independently of any JavaScript framework.

## Simplicity of Design

The core philosophy of Artistry is:  **HTML first, CSS second, JavaScript third.**

* **First**, we keep the HTML structures simple, with less tags, less nesting, and more meaning.  As a developer, you should focus on your data and your content, not a hundred nested `<div>` tags.
* **Second**, we let CSS classes do the styling and animating.  Adding just a few classes here is enough to style every widget.  In most cases this is enough.  All of the animation is powered by CSS.
* **Third**, we keep JavaScript to an absolute minimum.  Most often, it is used to simply toggle a class on and off.

## Ease of Integration

Because Artistry is mostly powered by HTML and CSS, with very limited JavaScript, it is very easy to integrate with a wide range of JavaScript frameworks.

## Flexible Configuration

Almost every aspect of the stylesheet is configurable.  Using Stylus, configuration can be done either inside the `.styl` files or with a `.json` file.  These changes can either be done globally, or to individual widgets.  And the widgets have been designed to work together.  So if for example you want to change the spacing of the entire stylesheet, you can set it in one place, and everything will be adjusted automatically.
