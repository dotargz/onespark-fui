/*

Window Manager for the OS. A core part of the OS.
Copyright (C) 2023  BlueSkye

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

// Core functions
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

		// update the window's position
		const windowID = element.getAttribute("data-window");
		const window = OSWindow.getWindowById(windowID);
		window.x = element.offsetTop - currentPosY;
		window.y = element.offsetLeft - currentPosX;
	}

	function closeDragElement() {
		document.removeEventListener("mouseup", closeDragElement);
		document.removeEventListener("mousemove", elementDrag);
	}
}

function randomId() {
	const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
	return uint32.toString(16);
}

class OSWindow {
	constructor(id, title, content, width, height, z = 1, error = false, important = false, iscentered = false, padding = true, resizeable = false, x = 0, y = 0) {
		this.window = document.createElement("div");
		this.id = id;
		this.title = title;
		this.content = content;
		this.width = width;
		this.height = height;
		this.z = z;
		this.error = error;
		this.important = important;
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
			this.toggleMinimize();
		});

		maximizeButton.addEventListener("click", () => {
			this.toggleMaximize();
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
		this.window.style.width = `${this.width}px`;
		this.window.style.height = `calc(${this.height}px + 2rem)`;

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

		let paddingStyle = "";

		if (this.padding == true) {
			paddingStyle = "padding: 0.5rem;";
		} else if (this.padding == false) {
			paddingStyle = "padding: 0;";
		} else {
			throw new Error("padding must be a boolean value");
		}

		if (this.resizeable == true) {
			this.window.style.resize = "both";
		} else if (this.resizeable == false) {
			this.window.style.resize = "none";
		} else {
			throw new Error("resizeable must be a boolean value");
		}

		let controls_available = `
		<span class="ui-window-control ui-window-control-minimize material-symbols-sharp" data-window="${this.id}">remove</span>
		<span class="ui-window-control ui-window-control-maximize material-symbols-sharp" data-window="${this.id}">fullscreen</span>
		<span class="ui-window-control ui-window-control-close material-symbols-sharp" data-window="${this.id}">close</span>
		`;

		// a window can be important, which means it can't be minimized or maximized. a window cannot have both important and error classes, but it can have the value set to true for both
		if (this.important == true && this.error == false) {
			this.window.classList.add("important");
			controls_available = `
			<span class="ui-window-control ui-window-control-minimize material-symbols-sharp" data-window="${this.id}" style="display:none;">remove</span>
			<span class="ui-window-control ui-window-control-maximize material-symbols-sharp" data-window="${this.id}" style="display:none;">fullscreen</span>
			<span class="ui-window-control ui-window-control-close material-symbols-sharp" data-window="${this.id}">close</span>
			`;
		} else if (this.important == false && this.error == false) {
			this.window.classList.remove("important");
			this.window.classList.remove("error");
		} else if (this.important == false && this.error == true) {
			this.window.classList.add("error");
			controls_available = `
			<span class="ui-window-control ui-window-control-minimize material-symbols-sharp" data-window="${this.id}" style="display:none;">remove</span>
			<span class="ui-window-control ui-window-control-maximize material-symbols-sharp" data-window="${this.id}">fullscreen</span>
			<span class="ui-window-control ui-window-control-close material-symbols-sharp" data-window="${this.id}">close</span>
			`;
		} else if (this.important == true && this.error == true) {
			this.window.classList.add("error");
			controls_available = `
			<span class="ui-window-control ui-window-control-minimize material-symbols-sharp" data-window="${this.id}" style="display:none;">remove</span>
			<span class="ui-window-control ui-window-control-maximize material-symbols-sharp" data-window="${this.id}" style="display:none;">fullscreen</span>
			<span class="ui-window-control ui-window-control-close material-symbols-sharp" data-window="${this.id}" style="display:none;">close</span>
			`;
		} else {
			throw new Error("important and error must be boolean values");
		}

		this.window.innerHTML = `
		<div class="ui-window-titlebar">
						<span class="ui-window-title">${this.title}</span>
						<span class="ui-window-controls">
							${controls_available}
						</span>
					</div>
					<div class="ui-window-content" style="${paddingStyle}">
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

	toggleMinimize() {
		this.window.classList.toggle("minimized");
		if (this.window.classList.contains("minimized")) {
			document.dispatchEvent(new CustomEvent("OSWindowMinimized", { detail: this }));
		} else {
			document.dispatchEvent(new CustomEvent("OSWindowUnminimized", { detail: this }));
		}
	}

	toggleMaximize() {
		this.window.classList.toggle("maximized");
		if (this.window.classList.contains("maximized")) {
			document.dispatchEvent(new CustomEvent("OSWindowMaximized", { detail: this }));
		} else {
			document.dispatchEvent(new CustomEvent("OSWindowUnmaximized", { detail: this }));
		}
	}

	minimize() {
		this.window.classList.add("minimized");
		document.dispatchEvent(new CustomEvent("OSWindowMinimized", { detail: this }));
	}

	unminimize() {
		this.window.classList.remove("minimized");
		document.dispatchEvent(new CustomEvent("OSWindowUnminimized", { detail: this }));
	}

	maximize() {
		this.window.classList.add("maximized");
		document.dispatchEvent(new CustomEvent("OSWindowMaximized", { detail: this }));
	}

	unmaximize() {
		this.window.classList.remove("maximized");
		document.dispatchEvent(new CustomEvent("OSWindowUnmaximized", { detail: this }));
	}

	restoreSize() {
		this.window.classList.remove("minimized");
		this.window.classList.remove("maximized");
		document.dispatchEvent(new CustomEvent("OSWindowRestored", { detail: this }));
	}

	makeImportant() {
		this.window.classList.add("important");
	}

	makeUnimportant() {
		this.window.classList.remove("important");
	}

	static destroyWindowById(id) {
		for (let window of OSWindow.windows) {
			if (window.id === id) {
				window.destroy();
				break;
			}
		}
	}

	static destroyAllWindows() {
		for (let window of OSWindow.windows) {
			if (window.important == false && window.error == false) {
				window.destroy();
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


OSWindow.windows = [];