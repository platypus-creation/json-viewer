---
layout: default
---

## Presentation

_json-viewer_ allows you to efficiently present highlighted and collapsable JSON. 

For efficiency it uses native `JSON.stringify` function to turn your json into a string, and then augment it with html markup.

## Installation

    bower install angular-json-viewer
    
## Usage

1.  Include json-viewer.js and json-viewer.css into your app.
2.  Add platypus.jsonviewer as a module dependency to your app : `angular.module('YOUR_APP', ['platypus.jsonviewer'])`
3.  Use the directive with you json content


    <div json-viewer="MY_JSON"></div>

    
## Demo

<div class="demo" json-viewer="exempleJson"></div>


