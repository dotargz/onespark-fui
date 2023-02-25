function randomId() {
	const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
	return uint32.toString(16);
}

const OSPrograms = {
	welcome: function (x = 0, y = 0) {
		// create a new window with the new OSWindow class
		let _id = randomId();
		this.welcome.self = new OSWindow(
			_id,
			"welcome!",
			`<p class="ui-window-text">Welcome to the best browser-based OS ever! You can drag the windows around, and you can minimize, maximize, and close them.</p>
        <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">okay</button><button class="ui-window-button" data-window="${_id}">close</button></div>`,
			300,
			175,
			2,
			(important = false),
			(iscentered = true),
			(padding = true),
			(resizeable = false),
			(x = x),
			(y = y)
		);

		// close the window when the okay button is clicked (use the data-window attribute to get the window id) use destroyWindowWithId(id) to destroy the window
		this.welcome.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
		this.welcome.self.window.querySelector(".ui-window-button:nth-child(2)").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},

	howTo: function (x = 0, y = 0) {
		let _id = randomId();
		this.howTo.self = new OSWindow(
			_id,
			"How-To Manual",
			`<p class="ui-window-text">
            To open a program, right click anywhere to open the context menu, then click on the 'run program' button.
            To close a program, click the 'X' button in the top right corner of the window.
            </p>
            <p class="ui-window-text">
            To minimize a window, click the '-' button in the top right corner of the window.
            To maximize a window, click the '[]' button in the top right corner of the window.
            </p>
            <p class="ui-window-text">
            To move a window, click and drag the title bar at the top of the window.
            To resize a supported window, click and drag the bottom right corner of the window.
            </p>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">close</button></div>`,
			500,
			350,
			2,
			(important = false),
			(iscentered = true),
			(padding = true),
			(resizeable = false),
			(x = x),
			(y = y)
		);

		this.howTo.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},

	changelog: function (x = 0, y = 0) {
		let _id = randomId();
		this.changelog.self = new OSWindow(
			_id,
			"Changelog",
			`
            <p class="ui-window-text">
            0.1.0: initial release:
            </p>
            <ul class="ui-window-text">
                <li>added welcome program</li>
                <li>added text editor program</li>
                <li>added basic window controls</li>
            </ul>
            <p class="ui-window-text">
            0.2.0: overhauled window system:
            </p>
            <ul class="ui-window-text">
                <li>added dynamic window stacking</li>
                <li>added window minimizing</li>
                <li>added window closing</li>
                <li>added 'important' windows</li>
                <li>added 'DOOM' program</li>
                <li>added 'how-to' program</li>
                <li>added 'changelog' program</li>
                <li>added 'about' program</li>
            </ul>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">close</button></div>`,
			375,
			375,
			2,
			(important = false),
			(iscentered = true),
			(padding = true),
			(resizeable = false),
			(x = x),
			(y = y)
		);

		this.changelog.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},

	about: function (x = 0, y = 0) {
		let _id = randomId();
		this.about.self = new OSWindow(
			_id,
			"About",
			`<p class="ui-window-text">
            This is a browser-based OS made by <a href="blueskye.dev">Blueskye</a>.
            Copyright (C) 2023  BlueSkye
            </p>
            <p class="ui-window-text">
            This program is free software: you can redistribute it and/or modify
            it under the terms of the GNU General Public License as published by
            the Free Software Foundation, either version 3 of the License, or
            any later version.
            </p>

            <p class="ui-window-text">
            This program is distributed in the hope that it will be useful,
            but WITHOUT ANY WARRANTY; without even the implied warranty of
            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
            GNU General Public License for more details.
            </p>

            <p class="ui-window-text">
            You should have received a copy of the GNU General Public License
            along with this program.  If not, see <a href="https://www.gnu.org/licenses">gnu.org/licenses</a>.
            </p>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">close</button></div>`,
			520,
			410,
			2,
			(important = false),
			(iscentered = true),
			(padding = true),
			(resizeable = false),
			(x = x),
			(y = y)
		);

		this.about.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},

	textEditor: function (x = 0, y = 0) {
		let _id = randomId();
		this.textEditor.self = new OSWindow(_id, "text editor", `<textarea class="ui-window-textarea" data-window="${_id}"></textarea>`, 300, 210, 2, (important = false), (iscentered = true), (padding = true), (resizeable = true), (x = x), (y = y));

		this.textEditor.self.window.querySelector(".ui-window-textarea").addEventListener("input", () => {
			localStorage.setItem("textEditor-" + _id, this.textEditor.self.window.querySelector(".ui-window-textarea").value);
		});

		this.textEditor.self.window.querySelector(".ui-window-textarea").value = localStorage.getItem("textEditor");
	},

	doom: function (x = 0, y = 0) {
		let _id = randomId();
		this.doom.self = new OSWindow(
			_id,
			"doom",
			`<div class="ui-window-jsdos-wrapper">
            <iframe width="710" height="400" frameborder="0" src="https://dos.zone/player/?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos?anonymous=1" allowfullscreen class="ui-window-iframe jsdos-iframe" id="doom-${_id}" data-window="${_id}"
            ></iframe>
            </div>`,
			632,
			405,
			2,
			(important = false),
			(iscentered = true),
			(padding = false),
			(resizeable = false),
			(x = x),
			(y = y)
		);
	},

	launcher: function (x = 0, y = 0) {
		let _id = randomId();
		this.launcher.self = new OSWindow(
			_id,
			"run program",
			`
            <div class="ui-window-row">
            <p class="ui-window-text">welcome! <button class="ui-window-button launch-welcome">launch</button></p>
            <p class="ui-window-text">doom: 1993<button class="ui-window-button launch-doom">launch</button></p>
            <p class="ui-window-text">text editor <button class="ui-window-button launch-txt">launch</button></p>
            <p class="ui-window-text">about <button class="ui-window-button launch-about">launch</button></p>
            </div>
            `,
			375,
			150,
			2,
			(important = false),
			(iscentered = true),
			(padding = true),
			(resizeable = false),
			(x = x),
			(y = y)
		);

		this.launcher.self.window.querySelector(".launch-welcome").addEventListener("click", () => {
			OSPrograms.welcome();
		});

		this.launcher.self.window.querySelector(".launch-doom").addEventListener("click", () => {
			OSPrograms.doom();
		});

		this.launcher.self.window.querySelector(".launch-txt").addEventListener("click", () => {
			OSPrograms.textEditor();
		});

        this.launcher.self.window.querySelector(".launch-about").addEventListener("click", () => {
            OSPrograms.about();
        });

	},
};

const OSFunctions = {
	clearStorage: function () {
		// prompt the user to confirm that they want to clear the localStorage using an OSWindow
		let _id = randomId();
		this.clearStorage.self = new OSWindow(
			_id,
			"clear storage",
			`<p class="ui-window-text">Are you sure you want to clear the localStorage?</p>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">yes</button><button class="ui-window-button" data-window="${_id}">no</button></div>`,
			300,
			150,
			2,
			(important = true),
			(iscentered = true),
			(padding = true)
		);

		// close the window when the okay button is clicked (use the data-window attribute to get the window id) use destroyWindowWithId(id) to destroy the window
		this.clearStorage.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
			localStorage.clear();
			window.location.reload();
		});
		this.clearStorage.self.window.querySelector(".ui-window-button:nth-child(2)").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},

	minimizeAll: function () {
		for (let window of OSWindow.windows) {
			// important windows can't be minimized
			if (window.important) continue;
			window.minimize();
		}
	},

	unMinimizeAll: function () {
		for (let window of OSWindow.windows) {
			// important windows can't be minimized
			if (window.important) continue;
			window.unminimize();
		}
	},

	copy: function () {
		// ask the user for permission to access the clipboard
		navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
			if (result.state == "granted" || result.state == "prompt") {
				// copy the selected text to the clipboard
				navigator.clipboard.writeText(window.getSelection().toString());
			}
		});

		// save the selected text to localStorage
		localStorage.setItem("copiedText", window.getSelection().toString());
	},

	// document.execCommand is deprecated. don't rely on it.
	paste: function () {
		let copiedText = localStorage.getItem("copiedText");
		if (copiedText === null) return;
		document.execCommand("insertText", false, copiedText);
	},

	exit: function () {
		// prompt the user to confirm that they want to clear the localStorage using an OSWindow
		let _id = randomId();
		this.exit.self = new OSWindow(
			_id,
			"exit",
			`<p class="ui-window-text">Are you sure you want to exit? All unsaved data will be lost.</p>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">yes</button><button class="ui-window-button" data-window="${_id}">no</button></div>`,
			300,
			75,
			2,
			(important = true),
			(iscentered = true),
			(padding = true)
		);

		// close the window when the okay button is clicked (use the data-window attribute to get the window id) use destroyWindowWithId(id) to destroy the window
		this.exit.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
			// animate fade out the html element (only play once)
			document.querySelector("html").style.animation = "fadeOut 0.75s normal forwards ease-in-out";
			// reload the page after 5 seconds
			setTimeout(() => {
				// reload the page
				window.location.reload();
			}, 5000);
		});
		this.exit.self.window.querySelector(".ui-window-button:nth-child(2)").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},
};
