// Big Sur Context Menu
// by PineappleRind, 2021
// MIT License

class ContextMenu {
  /**
   * @todo Make the opacity transition happen
   * also when the context menu is open
   * and the user clicks elsewhere
   * @todo Dark mode!
   * @todo Write documentation, possibly try JSDoc.
   */
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
          if (!items[i].action) return;
          try {
            items[i].action();
          } catch (err) {
            console.error(err);
          }
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
        html.style.top = pos.y + "px";
        html.style.left = pos.x + "px";
        e.preventDefault();
        document.body.appendChild(html);
        let bcr = html.getBoundingClientRect();
        if (bcr.left + bcr.width > window.innerWidth)
          html.style.left = pos.x - bcr.width + "px";
        if (bcr.top + bcr.height > window.innerHeight)
          html.style.top = pos.y - bcr.height + "px";

        html.open = true;
      };
      onclick = (e) => {
        if (html.open == false) return; // Don't close it if it's already closed.
        let className = e.target.classList[0] || " ";
        if (className.toString().includes("BSCM")) {
          // If user is clicking on context menu
          return; // Don't close.
        } else {
          // If user isn't clicking on context menu
          html.open = false; // Close.
          html.style.opacity = "0";
          setTimeout(function () {
            html.remove();
          }, 200);
        }
      };
    }
  }
}
