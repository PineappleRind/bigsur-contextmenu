// Big Sur Context Menu
// by PineappleRind, 2021
// MIT License
function ContextMenu(options) {
  const self = this;
  const cm = document.createElement("DIV");
  cm.classList.add("BSCM_contextmenu");
  cm.style.opacity = "1";

  if (!options) return console.error("No object passed.");
  if (!options.items) return console.error("No context menu items.");

  const themes = ["light", "dark", "deviceTheme"];
  if (options.theme) {
    let correctTheme = false;
    for (const theme in themes) {
      if (options.theme === themes[theme]) correctTheme = true;
    }
    if (correctTheme === true) cm.classList.add(`BSCM_${options.theme}`);
  }

  function addItems(container, items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i] === 1) {
        const cmItem = document.createElement("DIV");
        cmItem.classList.add("BSCM_separator");
        container.insertAdjacentElement("beforeend", cmItem);
        continue;
      }
      if (!items[i].name) {
        console.error(`Item ${i} does not have a name.`);
      }
      const cmItem = document.createElement("DIV");
      cmItem.index = i;
      cmItem.classList.add("BSCM_item");
      container.insertAdjacentElement("beforeend", cmItem);
      cmItem.innerHTML = items[i].name;
      if (items[i].disabled) cmItem.classList.add("BSCM_itemDisabled");
      if (items[i].items) {
        cmItem.classList.add("BSCM_nestedContainer");
        const nestedCont = document.createElement("DIV");
        nestedCont.classList.add("BSCM_nested");
        cmItem.insertAdjacentElement("beforeend", nestedCont);
        try {
          addItems(nestedCont, items[i].items);
        } catch (error) {
          console.error(error);
        }
        container.insertAdjacentElement("beforeend", cmItem);
        continue;
      }
      cmItem.onclick = (e) => {
        e.target.style.animationName = "BSCM_flash";
        setTimeout(() => {
          e.target.style.animationName = "";
          self.close();
          items[e.target.index]?.action();
        }, 200);
      };
    }
  }

  addItems(cm, options.items);
  this.attach = (element) => {
    if (!element) return console.error("No element passed to attach to.");
    try {
      const elements = element.concat([]);
      for (const el of elements) attachContextMenu(cm, el);
    } catch (err) {
      console.error(err);
    }
  };

  this.close = () => {
    cm.open = false; // Close.
    cm.style.transition = "0.3s";
    cm.style.opacity = "0";
    setTimeout(() => {
      cm.style.transition = "0";
      cm.remove();
    }, 200);
  };

  function attachContextMenu(html, element) {
    element.oncontextmenu = (e) => {
      e.preventDefault();
      const pos = {
        x: e.clientX,
        y: e.clientY,
      };
      if (html.open === true) {
        html.style.transition = "0.3s opacity"; // Hide the new one
        setTimeout(() => {
          // Show the new one
          html.style.opacity = "0";
          setTimeout(() => {
            html.style.transition = "0s opacity";
            setCoordinates();
            html.style.opacity = "1";
          }, 200);
        }, 0);
        html.open = true;
      } else {
        html.style.opacity = "1";
        setCoordinates();
        html.style.transition = "0";
      }

      function setCoordinates() {
        html.style.top = `${pos.y}px`; // Open the context menu to the bottom right of the mouse
        html.style.left = `${pos.x}px`;
        clampToScreen(html, pos.x, pos.y); // Menu will open to the top of the mouse
      }
      document.body.appendChild(html);
      html.open = true;

      function clampToScreen(html, x, y) {
        const bcr = html.getBoundingClientRect();
        if (bcr.left + bcr.width > window.innerWidth)
          // If context menu exceeds X coordinate
          html.style.left = `${x - bcr.width}px`; // Menu will open to the left of the mouse
        if (bcr.top + bcr.height > window.innerHeight)
          // If context menu exceeds Y coordinate
          html.style.top = `${y - bcr.height}px`;
      }
    };
    window.addEventListener("click", (e) => {
      if (html.open === false) {
        html.style.transition = "0";
        return;
      }
      const className = e.target.classList[0] || " ";
      if (className.toString().includes("BSCM")) return;

      self.close();
    });
  }
}
