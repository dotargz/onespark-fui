const OSFirmware = {
	name: "OneSpark® UI",
	stage: "alpha",
	version: "0.7.0",

	// Utility functions
	// Generate a random ID (used throughout the OS)
	randomid() {
		const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
		return uint32.toString(16);
	},

	// Get the current date+time
	gettime() {
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		let ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		let strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
		return strTime;
	},

	exec(command) {
		let FULLCMD = command.toLowerCase().trim();
		let ARGS = FULLCMD.split(" ").filter((arg) => arg !== "");
		let CMDNAME = ARGS.shift();
		if (CMDNAME in OSPrograms) {
			return OSPrograms[CMDNAME](ARGS);
		} else {
			return `Command '${CMDNAME}' not found. Type 'help' for a list of commands.`;
		}
	},

	onStart() {
		try {
			// update the title(s)
			document.title = `${OSFirmware.name} ~ ${OSFirmware.stage} v${OSFirmware.version}`.toUpperCase();
			document.getElementById("main-logo").innerHTML = `${OSFirmware.name} ~ ${OSFirmware.stage} v${OSFirmware.version}`.toUpperCase();
			OSPrograms.welcome();
		} catch (e) {
			console.error(e);
			let _id = this.randomid();
			new OSWindow(
				_id,
				"Error",
				`
			<p class="ui-window-text">Something went wrong while starting the OS. Please report this error to the developer.</p><p class="ui-window-text">${e}</p>
			<div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">abort</button><button class="ui-window-button" data-window="${_id}">retry</button></div>
			`,
				400,
				175,
				1,
				true,
				true,
				true,
				true,
				false,
				0,
				0
			);
		}
	},
};

document.addEventListener("DOMContentLoaded", OSFirmware.onStart);
