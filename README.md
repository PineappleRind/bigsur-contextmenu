# BigSur ContextMenu
Context menus in the style of MacOS Big Sur.

## Installation
Download the files `index.js` and `index.css` and include them in your code.
```html
<script defer src="index.js"></script>
```
```html
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

**Arguments for the ContextMenu class**

| Argument | What it does                                                       | Type   | Optional? |
|----------|--------------------------------------------------------------------|--------|-----------|
| `items`  | Array of items inside <br>this context menu                        | Array  | No        |
| `theme`  | The theme of the context menu<br>`light`, `dark`, or `deviceTheme` | String | Yes       |


**Options for the `items` argument**

| Argument   | What it does                                                       | Type     | Optional? |
|------------|--------------------------------------------------------------------|----------|-----------|
| `name`     | The name of the item in the menu                                   | String   | No        |
| `action`   | The action to be executed on <br>item click                        | Function | Yes       |
| `items`    | Object array for items inside <br>this item. Use this for nesting  | Array    | Yes       |
| `disabled` | If the item will be greyed out <br>and will not respond to actions | Boolean  | Yes       |

## Example
```javascript
let menu = new ContextMenu({
    items: [ 
         {
             name: 'Undo', 
             action: function() {
                 alert('Are you sure you want to undo?')
             }
         }, {
             name: 'Redo',
             disabled: true
         }
    ]
})
menu.attach(document.querySelector('canvas'))
```
