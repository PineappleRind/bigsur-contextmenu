/*
   Big Sur Context Menu
   by PineappleRind
   2021
*/
function ContextMenu(options) {
    let cm
    cm = document.createElement('DIV');
    cm.classList.add('BSCM_contextmenu');
    for (let i = 0; i < options.items.length; i++) {
        if (!options.items[i].name) {
            console.error(new Error('One item in the context menu does not have a name.'));
        }
        let cmItem = document.createElement('DIV');
        cmItem.classList.add('BSCM_item');
        cmItem.innerHTML = options.items[i].name;
        cmItem.onclick = () => {
            try {
                options.items[i].action();
            } catch (err) {
                console.error(err);
            }
        }
        cm.appendChild(cmItem);
    }
    console.log(this);
    this.attach = (element) => {
        if (!element) {
            let err = new Error('No element passed to attach to.');
            console.error(err);
        }
        if (element.length) {
            for (let i = 0; i < element.length; i++) {
                __attachContextMenu(cm, element[i]);
            }
            return
        }
        try {
            __attachContextMenu(cm, element);
        } catch (err) { console.log(err) }
    }

}

function __attachContextMenu(html, element) {
    element.oncontextmenu = e => {
        let pos = { x: e.clientX, y: e.clientY }
        html.style.top = pos.y + 'px'
        html.style.left = pos.x + 'px'
        e.preventDefault()
        console.log(html)
        document.body.appendChild(html);
        let bcr = html.getBoundingClientRect()
        console.log(bcr.x + ' ' + window.innerWidth)
        if ((bcr.left + bcr.width) > window.innerWidth) html.style.left = pos.x - bcr.width + 'px'
        if ((bcr.top + bcr.height) > window.innerHeight) html.style.top = pos.y - bcr.height + 'px'
    }
}