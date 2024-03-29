# BigSur ContextMenu
Context menus in the style of MacOS Big Sur.

*v0.1.1 - 2.27KB minified*

## Installation
Download the files `src/index.min.js` and `src/index.min.css` and include them in your code.
```html
<script defer src="index.min.js"></script>
```
```html
<link defer rel="stylesheet" href="index.min.css">
```

## Usage
To instantiate a context menu:
```javascript
let menu = new ContextMenu({
    //...
})
```

To attach the context menu to an element, use the `attach()` method:
```javascript
menu.attach(document.getElementById('drawCanvas'))
```
The argument passed must be an HTML element, or an array of HTML elements to attach the menu to all of the elements in the array.

## Options
**Arguments for the object passed into the `ContextMenu` class**

| Argument | What it does                                                                 | Type              | Optional? |
|----------|------------------------------------------------------------------------------|-------------------|-----------|
| `items`  | Array of items inside <br>this context menu                                  | Array of objects  | No        |
| `theme`  | The theme of the context menu<br>`light`, `dark`, or `deviceTheme` (default) | String            | Yes       |


**Options for objects inside `items` array**

| Argument   | What it does                                                       | Type               | Optional? |
|------------|--------------------------------------------------------------------|--------------------|-----------|
| `name`     | The name of the item in the menu                                   | String             | No        |
| `action`   | The action to be executed on <br>item click                        | Function           | Yes       |
| `items`    | Object array for items inside <br>this item. Use this for nesting  | Array of objects   | Yes       |
| `disabled` | If the item will be greyed out <br>and will not respond to actions | Boolean            | Yes       |

To add a separator, add the number `1` to the array instead of a normal item object.

## Example
```javascript
let menu = new ContextMenu({
    theme: 'dark',
    items: [{
        name: "New Finder Window",
        action: () => {
            alert('Opening window...')
        }
    }, {
        name: "New Smart Window",
    }, {
        name: "Find..."
    }, 1, {
        name: "Go To Folder..."
    }, {
        name: "Connect To Server...",
        disabled: true,
    }, 1, {
        name: "Options",
        items: [{
            name: "Remove From Dock",
            action: () => {
                alert('Removed')
            }
        }, {
            name: "Open At Login",
            action: () => {
                alert('Will now open at login')
            }
        }, {
            name: "Show In Finder"
        }]
    }]
});
menu.attach([
    document.querySelector('.box'),
    document.querySelector('.box2')
]);
```
