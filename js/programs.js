// a program is a function that creates a new window
const OSPrograms = {
	welcome: function (x = 0, y = 0) {
		// create a new window with the new OSWindow class
		let _id = OSFirmware.randomid();
		this.welcome.self = new OSWindow(
			_id,
			"welcome!",
			`<p class="ui-window-text">Welcome to the best browser-based OS ever! You can drag the windows around, and you can minimize, maximize, and close them.</p>
        <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">okay</button><button class="ui-window-button" data-window="${_id}">close</button></div>`,
			300,
			175,
			2,
			(error = false),
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

	howto: function (x = 0, y = 0) {
		let _id = OSFirmware.randomid();
		this.howto.self = new OSWindow(
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
			(error = false),
			(important = false),
			(iscentered = true),
			(padding = true),
			(resizeable = false),
			(x = x),
			(y = y)
		);

		this.howto.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},

	changelog: function (x = 0, y = 0) {
		let _id = OSFirmware.randomid();
		this.changelog.self = new OSWindow(
			_id,
			"Changelog",
			`
            <p class="ui-window-text">0.6.0: Chores:</p>
			<ul class="ui-window-text">
				<li>removed the gui launcher for a run prompt</li>
				<li>added the 'terminal' program</li>
				<li>fatal error screen now goes away on refresh</li>
				<li>refactored the some code</li>
			</ul>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">close</button></div>`,
			375,
			350,
			2,
			(error = false),
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

	debug: function (x = 0, y = 0) {
		let _id = OSFirmware.randomid();
		this.debug.self = new OSWindow(
			_id,
			"Debug Options",
			`<p class="ui-window-text">This is the debug options window. You can use this to test the OS.</p>
			<div class="ui-window-buttons"><button class="ui-window-button throw-error-button" data-window="${_id}">throw error</button>
			<button class="ui-window-button throw-long-error-button" data-window="${_id}">throw long error</button></div>
			<div class="ui-window-buttons"><button class="ui-window-button close-all-button" data-window="${_id}">close all windows</button>
			<button class="ui-window-button relaunch-button" data-window="${_id}">relaunch</button></div>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">close</button></div>`,
			375,
			190,
			2,
			(error = false),
			(important = false),
			(iscentered = true),
			(padding = true),
			(resizeable = false),
			(x = x),
			(y = y)
		);

		this.debug.self.window.querySelector(".ui-window-buttons > .ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});

		this.debug.self.window.querySelector(".throw-error-button").addEventListener("click", () => {
			throw new Error("This is a test error.");
		});

		this.debug.self.window.querySelector(".throw-long-error-button").addEventListener("click", () => {
			throw new Error("This is a long test error. It really is a long test error. It's so long that even the longest of test errors are jealous of it");
		});

		this.debug.self.window.querySelector(".close-all-button").addEventListener("click", () => {
			OSWindow.destroyAllWindows();
		});

		this.debug.self.window.querySelector(".relaunch-button").addEventListener("click", () => {
			location.reload();
		});
	},

	about: function (x = 0, y = 0) {
		let _id = OSFirmware.randomid();
		this.about.self = new OSWindow(
			_id,
			"About",
			`<p class="ui-window-text">
            This is a browser-based OS made by <a href="https://blueskye.dev">Blueskye</a>.
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
			(error = false),
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

	texteditor: function (x = 0, y = 0) {
		let _id = OSFirmware.randomid();
		this.texteditor.self = new OSWindow(_id, "text editor", `<textarea class="ui-window-textarea" data-window="${_id}" placeholder="TYPE HERE..."></textarea>`, 300, 210, 2, (error = false), (important = false), (iscentered = false), (padding = true), (resizeable = true), (x = x), (y = y));

		this.texteditor.self.window.querySelector(".ui-window-textarea").addEventListener("input", () => {
			localStorage.setItem("textEditor-" + _id, this.texteditor.self.window.querySelector(".ui-window-textarea").value);
		});

		this.texteditor.self.window.querySelector(".ui-window-textarea").value = localStorage.getItem("textEditor");
	},

	doom: function (x = 0, y = 0) {
		let _id = OSFirmware.randomid();

		// bugfix
		localStorage.setItem("emulators.ui.ui.tipsV2", "false");
		localStorage.setItem("emulators.ui.ui.autolockTipsV2", "false");

		this.doom.self = new OSWindow(
			_id,
			"doom",
			`<div class="ui-window-jsdos-wrapper">
            <iframe width="710" height="400" frameborder="0" src="../assets/doom/doom.html?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos?anonymous=1" allowfullscreen class="ui-window-iframe jsdos-iframe" id="doom-${_id}" data-window="${_id}"
            ></iframe>
            </div>`,
			632,
			405,
			2,
			(error = false),
			(important = false),
			(iscentered = true),
			(padding = false),
			(resizeable = false),
			(x = x),
			(y = y)
		);
	},

	launcher: function (x = 0, y = 0) {
		let _id = OSFirmware.randomid();
		this.launcher.self = new OSWindow(
			_id,
			"run program",
			`
            <input class="ui-window-input" type="text" placeholder="type here..." data-window="${_id}">
			<div class="ui-window-buttons">
			<button class="ui-window-button" data-window="${_id}">run</button> <button class="ui-window-button" data-window="${_id}">cancel</button>
			</div>
            `,
			375,
			95,
			2,
			(error = false),
			(important = false),
			(iscentered = true),
			(padding = true),
			(resizeable = false),
			(x = x),
			(y = y)
		);

		this.launcher.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			let _input = this.launcher.self.window.querySelector(".ui-window-input").value.toLowerCase().trim();
			OSFirmware.exec(_input);
			OSWindow.destroyWindowById(_id);
		});

		this.launcher.self.window.querySelector(".ui-window-button:last-child").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},

	terminal: function (x = 0, y = 0) {
		let _id = OSFirmware.randomid();
		this.terminal.self = new OSWindow(_id, "terminal", `<div class="ui-window-terminal-output" data-window="${_id}"></div><div class="ui-window-group terminal">~$ <input type="text" class="ui-window-input terminal" data-window="${_id}" placeholder=""></div>`, 400, 210, 2, (error = false), (important = false), (iscentered = false), (padding = true), (resizeable = true), (x = x), (y = y));

		// create a new terminal
		// constructor Terminal(outputdiv: any, inputdiv: any, version: any): Terminal
		this.terminal.self.terminal = new Terminal(_id, this.terminal.self.window.querySelector(".ui-window-terminal-output"), this.terminal.self.window.querySelector(".ui-window-input"), "1.0.0");
		this.terminal.self.terminal.init();
	},

	// TODO: MOVE TO OSFIRMWARE WHIST STILL KEEPING SIMPLE USE
	fw: function (cmd) {
		if (cmd == "" || cmd == "version" || cmd == "name" || cmd == undefined) {
			return OSFirmware.name + " [" + OSFirmware.version + "]";
		} else if (cmd == "help") {
			let _help = "";
			for (let i in OSFirmware) {
				if (typeof OSFirmware[i] == "function") {
					_help += i + " ";
				}
			}
			return _help;
		}
		try {
			return OSFirmware[cmd]();
		} catch (e) {
			return "Procedure '" + cmd + "' not found";
		}
	},

	// TODO: MOVE TO OSFIRMWARE WHIST STILL KEEPING SIMPLE USE
	fn: function (cmd) {
		if (cmd == "" || cmd == "version" || cmd == "name" || cmd == undefined) {
			return OSFunctions.name + " [" + OSFunctions.version + "]";
		} else if (cmd == "help") {
			let _help = "";
			for (let i in OSFunctions) {
				if (typeof OSFunctions[i] == "function") {
					_help += i + " ";
				}
			}
			return _help;
		}
		try {
			return OSFunctions[cmd]();
		} catch (e) {
			return "Function '" + cmd + "' not found";
		}
	},

	clearstorage: function (x = 0, y = 0) {
		// prompt the user to confirm that they want to clear the localStorage using an OSWindow
		let _id = OSFirmware.randomid();
		this.clearstorage.self = new OSWindow(
			_id,
			"clear storage",
			`<p class="ui-window-text">Are you sure you want to clear the localStorage?</p>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">yes</button><button class="ui-window-button" data-window="${_id}">no</button></div>`,
			300,
			100,
			2,
			(error = false),
			(important = true),
			(iscentered = true),
			(padding = true)
		);

		// close the window when the okay button is clicked (use the data-window attribute to get the window id) use destroyWindowWithId(id) to destroy the window
		this.clearstorage.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
			OSFunctions.clearstorage();
		});
		this.clearstorage.self.window.querySelector(".ui-window-button:nth-child(2)").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},

	exit: function (x = 0, y = 0) {
		// prompt the user to confirm that they want to clear the localStorage using an OSWindow
		let _id = OSFirmware.randomid();
		this.exit.self = new OSWindow(
			_id,
			"exit",
			`<p class="ui-window-text">Are you sure you want to exit? All unsaved data will be lost.</p>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">yes</button><button class="ui-window-button" data-window="${_id}">no</button></div>`,
			300,
			100,
			2,
			(error = false),
			(important = true),
			(iscentered = true),
			(padding = true)
		);

		// close the window when the okay button is clicked (use the data-window attribute to get the window id) use destroyWindowWithId(id) to destroy the window
		this.exit.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
			OSFunctions.exit();
		});
		this.exit.self.window.querySelector(".ui-window-button:nth-child(2)").addEventListener("click", () => {
			OSWindow.destroyWindowById(_id);
		});
	},
};

// a function is a procedure that returns a value, and usually does not open a window
const OSFunctions = {
	name: "OneSpark® Standard Library",
	version: "0.2.0",

	clearstorage: function () {
		localStorage.clear();
		window.location.reload();
	},

	minimizeall: function () {
		for (let window of OSWindow.windows) {
			// important windows can't be minimized
			if (window.important) continue;
			window.minimize();
		}
	},

	unminimizeall: function () {
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
		// animate fade out the html element (only play once)
		document.querySelector("body").style.animation = "fadeOut 0.75s normal forwards ease-in-out";
		// reload the page after 5 seconds
		setTimeout(() => {
			// reload the page
			window.location.reload();
		}, 5000);
	},
};
