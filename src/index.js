// Big Sur Context Menu
// by PineappleRind, 2021
// MIT License
function ContextMenu(options) {
	var cm = document.createElement("DIV");
	cm.classList.add("BSCM_contextmenu");
	cm.style.opacity = "1";
	if (!options) return console.error(new Error("No object passed."));
	if (!options.items)
		return console.error(new Error("No context menu items."));
	var themes = ['light', 'dark', 'deviceTheme']
	if (options.theme) {
		var correctTheme = false
		for (var theme in themes) {
			if (options.theme === themes[theme]) correctTheme = true
		}
		if (correctTheme == true) cm.classList.add("BSCM_" + options.theme)
	}

	function addItems(container, items) {
		for (var i = 0; i < items.length; i++) {
			if (items[i] === 1) {
				var cmItem = document.createElement("DIV");
				cmItem.classList.add("BSCM_separator");
				container.insertAdjacentElement("beforeend", cmItem);
				continue;
			}
			if (!items[i].name) {
				console.error(new Error("Item " + i + " does not have a name."));
			}
			var cmItem = document.createElement("DIV");
			cmItem.index = i
			cmItem.classList.add("BSCM_item");
			container.insertAdjacentElement("beforeend", cmItem);
			cmItem.innerHTML = items[i].name;
			if (items[i].disabled) {
				cmItem.classList.add("BSCM_itemDisabled");
			}
			if (items[i].items) {
				cmItem.classList.add("BSCM_nestedContainer");
				var nestedCont = document.createElement("DIV");
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
			cmItem.onclick = function(e) {
				e.target.style.animationName = 'BSCM_flash'
				setTimeout(function() {
					e.target.style.animationName = ''

					if (items[e.target.index].action) items[e.target.index].action();
					else return;
				}, 200)
			};
		}
	}
	addItems(cm, options.items);
	this.attach = function(element) {
		if (!element) {
			var err = new Error("No element passed to attach to.");
			console.error(err);
		}
		if (element.length) {
			for (var i = 0; i < element.length; i++) {
				attachContextMenu(cm, element[i]);
			}
			return;
		}
		try {
			attachContextMenu(cm, element);
		} catch (err) {
			console.error(err);
		}
	};

	function attachContextMenu(html, element) {
		element.oncontextmenu = function(e) {
			e.preventDefault();
			var pos = {
				x: e.clientX,
				y: e.clientY,
			};
			if (html.open == true) {
				html.style.transition = '0.3s opacity'; // Hide the new one
				setTimeout(function() { // Show the new one
					html.style.opacity = '0'
					setTimeout(function() {
						html.style.transition = '0s opacity';
						setCoordinates()
						html.style.opacity = '1'
					}, 200)
				}, 0)
				html.open = true
			} else {
				html.style.opacity = "1";
				setCoordinates()
				html.style.transition = '0'
			}

			function setCoordinates() {
				html.style.top = pos.y + "px"; // Open the context menu to the bottom right of the mouse
				html.style.left = pos.x + "px";
				var bcr = html.getBoundingClientRect();
				if (bcr.left + bcr.width > window.innerWidth) // If context menu exceeds X coordinate
					html.style.left = pos.x - bcr.width + "px"; // Menu will open to the left of the mouse
				if (bcr.top + bcr.height > window.innerHeight) // If context menu exceeds Y coordinate
					html.style.top = pos.y - bcr.height + "px"; // Menu will open to the top of the mouse
			}
			document.body.appendChild(html);
			html.open = true;
		};
		onclick = function(e) {
			if (html.open == false) return html.style.transition = '0';
			var className = e.target.classList[0] || " ";
			if (className.toString().includes("BSCM")) {
				// If user is clicking on a part of the menu
				return; // Don't close.
			} else {
				// If user isn't clicking on a part of the menu
				html.open = false; // Close.
				html.style.transition = '0.3s'
				html.style.opacity = "0";
				setTimeout(function() {
					html.style.transition = '0'
					html.remove();
				}, 200);
			}
		};
	}
}