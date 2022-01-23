# BigSur ContextMenu
Context menus in the style of MacOS Big Sur.

## Installation
Download the files `index.js` and `index.css` and include them in your code.
```javascript
<script defer src="index.js"></script>
```
```css
<link defer rel="stylesheet" href="index.css">
```

## Usage
To instantiate a context menu, use the `ContextMenu` class:
```javascript
let menu = new ContextMenu({
    //...
})
```

To attach the context menu to an element, use the `attach()` method:
```javascript
menu.attach(document.body)
```
The argument passed is the element to attach the `contextmenu` event to.

## Options
Pass an object into the `ContextMenu` class.
```javascript
let menu = new ContextMenu({
    items: [ // Array of objects containing the items displayed on the menu
         {
             name: 'Undo', // Name of the item
             action: function() { // Action. Function that gets called upon click of the item
                 alert('Are you sure you want to undo?')
             }
         }, {
             name: 'Redo',
             disabled: true, // Boolean. Determines if the user can click the item or not. If true, the item will be greyed out and will not respond to actions.
         }
    ]
})
```
