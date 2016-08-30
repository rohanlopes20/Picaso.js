# Picaso.js
===========

#### JavaScript RandomBg Img library ####

This is JS library for creating beautiful canvas backgrounds. 

#### Usage ####

Download Picaso.js from git repo and include it in your html.

```html
<script src="js/picaso.js"></script>
```

Use Picaso object to create bg img. 
```javascript
blocksX - indicates width of square/circle block 
blocksY - indicates height of square/circle block 
height  - indicates height of canvas
width   - indicates width of canvas
type    - indicates type of img geometries(eg. rect, square, random)
shade   - indicates shade color of canvas

``` 
```javascript
  Picaso({
    "blocksX" : 35,
    "blocksY" : 35,
    "height"  : window.innerHeight,
    "width"   : window.innerWidth,
    "type"    : "rect",
    "shade"   : "random"
  }).canvas();

```
