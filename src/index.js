// Big Sur Context Menu
// by PineappleRind, 2021
// MIT License
class ContextMenu {
  constructor(options) {
    let cm;
    cm = document.createElement("DIV");
    cm.classList.add("BSCM_contextmenu");
    cm.style.opacity = "1";
    if (!options) return console.error(new Error("No object passed."));
    if (!options.items)
      return console.error(new Error("No context menu items."));

    function __addItems(container, items) {
      for (let i = 0; i < items.length; i++) {
        if (!items[i].name) {
          console.error(new Error("Item " + i + " does not have a name."));
        }
        let cmItem = document.createElement("DIV");
        cmItem.classList.add("BSCM_item");
        container.insertAdjacentElement("beforeend", cmItem);
        cmItem.innerHTML = items[i].name;
        if (items[i].disabled) {
          cmItem.classList.add("BSCM_itemDisabled");
        }
        if (items[i].items) {
          cmItem.classList.add("BSCM_nestedContainer");
          let nestedCont = document.createElement("DIV");
          nestedCont.classList.add("BSCM_nested");
          cmItem.insertAdjacentElement("beforeend", nestedCont);
          try {
            __addItems(nestedCont, items[i].items);
          } catch (error) {
            console.error(error);
          }
          container.insertAdjacentElement("beforeend", cmItem);
          continue;
        }
        cmItem.onclick = () => {
          cmItem.style.animationName = 'BSCM_flash'
          setTimeout(function () {
            cmItem.style.animationName = null
            if (!items[i].action) return;
            items[i].action();
          }, 200)
        };
      }
    }
    __addItems(cm, options.items);
    this.attach = (element) => {
      if (!element) {
        let err = new Error("No element passed to attach to.");
        console.error(err);
      }
      if (element.length) {
        for (let i = 0; i < element.length; i++) {
          __attachContextMenu(cm, element[i]);
        }
        return;
      }
      try {
        __attachContextMenu(cm, element);
      } catch (err) {
        console.log(err);
      }
    };

    function __attachContextMenu(html, element) {
      element.oncontextmenu = (e) => {
        let pos = {
          x: e.clientX,
          y: e.clientY,
        };
        html.style.opacity = "1";
        html.style.top = pos.y + "px"; // Open the context menu to the bottom right of the mouse
        html.style.left = pos.x + "px";
        html.style.transition = '0'
        e.preventDefault();
        document.body.appendChild(html);
        let bcr = html.getBoundingClientRect();
        if (bcr.left + bcr.width > window.innerWidth) // If context menu exceeds X coordinate
          html.style.left = pos.x - bcr.width + "px"; // Menu will open to the left of the mouse
        if (bcr.top + bcr.height > window.innerHeight) // If context menu exceeds Y coordinate
          html.style.top = pos.y - bcr.height + "px"; // Menu will open to the top of the mouse
        html.open = true;
      };
      onclick = (e) => {
        if (html.open == false) return html.style.transition = '0';
        let className = e.target.classList[0] || " ";
        if (className.toString().includes("BSCM")) {
          // If user is clicking on a part of the menu
          return; // Don't close.
        } else {
          // If user isn't clicking on a part of the menu
          html.open = false; // Close.
          html.style.transition = '0.3s'
          html.style.opacity = "0";
          setTimeout(function () {
            html.style.transition = '0'
            html.remove();
          }, 200);
        }
      };
    }
  }
}