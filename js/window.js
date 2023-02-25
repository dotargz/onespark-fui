function makeDraggable(element) {
	let currentPosX = 0,
		currentPosY = 0,
		previousPosX = 0,
		previousPosY = 0;

	const windowTop = element.querySelector(".ui-window-titlebar");

	if (windowTop) {
		windowTop.addEventListener("mousedown", dragMouseDown);
	} else {
		element.addEventListener("mousedown", dragMouseDown);
	}

	function dragMouseDown(e) {
		e.preventDefault();

		previousPosX = e.clientX;
		previousPosY = e.clientY;

		document.addEventListener("mouseup", closeDragElement);
		document.addEventListener("mousemove", elementDrag);

		element.classList.add("latest");
		// remove the latest class from all other windows
		const allWindows = document.querySelectorAll(".ui-window-draggable");
		allWindows.forEach((window) => {
			if (window !== element) {
				window.classList.remove("latest");
			}
		});
	}

	function elementDrag(e) {
		e.preventDefault();

		currentPosX = previousPosX - e.clientX;
		currentPosY = previousPosY - e.clientY;

		previousPosX = e.clientX;
		previousPosY = e.clientY;

		element.style.top = element.offsetTop - currentPosY + "px";
		element.style.left = element.offsetLeft - currentPosX + "px";
	}

	function closeDragElement() {
		document.removeEventListener("mouseup", closeDragElement);
		document.removeEventListener("mousemove", elementDrag);
	}
}

class OSWindow {
	constructor(id, title, content, width, height, z = 1, iscentered = false, padding = true, resizeable = false, x = 0, y = 0) {
		this.window = document.createElement("div");
		this.id = id;
		this.title = title;
		this.content = content;
		this.width = width;
		this.height = height;
		this.z = z;
		this.iscentered = iscentered;
		this.padding = padding;
		this.resizeable = resizeable;
		this.x = x;
		this.y = y;

		this.window.classList.add("ui-window-draggable");
		this.window.classList.add("latest");
		this.window.setAttribute("data-window", this.id);

		this.refresh();

		document.body.getElementsByTagName("main")[0].appendChild(this.window);

		makeDraggable(this.window);

		// add event listeners to the window controls
		const minimizeButton = this.window.querySelector(".ui-window-control-minimize");
		const maximizeButton = this.window.querySelector(".ui-window-control-maximize");
		const closeButton = this.window.querySelector(".ui-window-control-close");

		minimizeButton.addEventListener("click", () => {
			this.window.classList.toggle("minimized");

			// trigger window minimized event
			document.dispatchEvent(new CustomEvent("OSWindowMinimized", { detail: this }));
		});

		maximizeButton.addEventListener("click", () => {
			this.window.classList.toggle("maximized");

			// trigger window maximized event
			document.dispatchEvent(new CustomEvent("OSWindowMaximized", { detail: this }));
		});

		closeButton.addEventListener("click", () => {
			this.destroy();
		});

		// trigger window creation event
		document.dispatchEvent(new CustomEvent("OSWindowCreated", { detail: this }));

		// Add the newly created window instance to the list of all windows
		OSWindow.windows.push(this);
	}

	// add methods here
	updateTitle(title) {
		this.title = title;
		this.refresh();
	}

	updateContent(content) {
		this.content = content;
		this.refresh();
	}

	updateWidth(width) {
		this.width = width;
		this.refresh();
	}

	updateHeight(height) {
		this.height = height;
		this.refresh();
	}

	updateZ(z) {
		this.z = z;
		this.refresh();
	}

	updatePadding(padding) {
		this.padding = padding;
		this.refresh();
	}

	refresh() {
		this.window.style.width = this.width + "px";
		this.window.style.height = this.height + "px";

		if (this.iscentered === true) {
			this.window.style.left = "50%";
			this.window.style.top = "50%";
			this.window.style.transform = "translate(-50%, -50%)";
		} else if (this.iscentered === false) {
			this.window.style.left = this.x;
			this.window.style.top = this.y;
		} else {
			throw new Error("iscentered must be a boolean value");
		}

		if (this.padding === true) {
			this.padding = "padding: 0.5rem;";
		} else if (this.padding === false) {
			this.padding = "padding: 0;";
		} else {
			throw new Error("padding must be a boolean value");
		}

		if (this.resizeable === true) {
			this.window.style.resize = "both";
		} else if (this.resizeable === false) {
			this.window.style.resize = "none";
		} else {
			throw new Error("resizeable must be a boolean value");
		}

		this.window.innerHTML = `
		<div class="ui-window-titlebar">
						<span class="ui-window-title">${this.title}</span>
						<span class="ui-window-controls">
							<span class="ui-window-control ui-window-control-minimize material-symbols-sharp" data-window="${this.id}">remove</span>
							<span class="ui-window-control ui-window-control-maximize material-symbols-sharp" data-window="${this.id}">fullscreen</span>
							<span class="ui-window-control ui-window-control-close material-symbols-sharp" data-window="${this.id}">close</span>
						</span>
					</div>
					<div class="ui-window-content" style="${this.padding}">
						${this.content}
					</div>
		`;

		// trigger window refresh event
		document.dispatchEvent(new CustomEvent("OSWindowRefreshed", { detail: this }));
	}

	destroy() {
		this.window.remove();
		document.dispatchEvent(new CustomEvent("OSWindowDestroyed", { detail: this }));
	}

	save() {
		return {
			id: this.id,
			title: this.title,
			content: this.content,
			width: this.width,
			height: this.height,
			z: this.z,
			iscentered: this.iscentered,
			padding: this.padding,
			resizeable: this.resizeable,
			x: this.x,
			y: this.y,
		};
	}

	saveToLocalStorage() {
		localStorage.setItem("OSWindow-" + this.id, JSON.stringify(this.save()));
	}

	removeFromLocalStorage() {
		localStorage.removeItem("OSWindow-" + this.id);
	}

	static destroyWindowById(id) {
		for (let window of OSWindow.windows) {
			if (window.id === id) {
				window.destroy();
				break;
			}
		}
	}

	static getWindowById(id) {
		for (let window of OSWindow.windows) {
			if (window.id === id) {
				return window;
			}
		}
		return null;
	}
}

OSWindow.windows = [];

const windowStorage = {
	loadAllWindows: function () {
		for (let i = 0; i < localStorage.length; i++) {
			if (localStorage.key(i).startsWith("OSWindow-")) {
				let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
				new OSWindow(data.title, data.content, data.width, data.height, data.z, data.iscentered, data.padding, data.resizeable, data.x, data.y);
			}
		}
	},

	loadWindow: function (id) {
		let data = JSON.parse(localStorage.getItem("OSWindow-" + id));
		new OSWindow(data.title, data.content, data.width, data.height, data.z, data.iscentered, data.padding, data.resizeable, data.x, data.y);
	},

	anyWindows: function () {
		for (let i = 0; i < localStorage.length; i++) {
			if (localStorage.key(i).startsWith("OSWindow-")) {
				return true;
			}
		}
		return false;
	},
};
