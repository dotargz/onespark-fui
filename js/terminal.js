// a simple terminal API for the website.
class Terminal {
	constructor(id, outputdiv, inputdiv, version) {
        this.id = id;
		this.div = outputdiv;
		this.input = inputdiv;
		this.version = version;
		this.starterText = "Welcome to the website terminal! Type 'help' for a list of commands.";
    }

    // get commands from the OSPrograms object
	run(command) {
		let args = command.split(" ");
		let commandName = args.shift().toLowerCase();
        let output = "";
		if (commandName in OSPrograms) {
            output = OSPrograms[commandName](args);
            if (output === undefined) {
                output = "";
            }
            return output;
        } else if (commandName === "help") {
			return this.help();
		}
        return "Command not found.";
	}

	help() {
		let output = "";
		for (let command in OSPrograms) {
			output += command + " ";
		}
		return output;
	}

	init() {
		this.div.innerHTML = this.starterText;
		this.input.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				let command = this.input.value;
				this.input.value = "";
				this.div.innerHTML += "<br>" + "~$ " + command + "<br>";
				let output = this.run(command);
				this.div.innerHTML += output + "<br>";

				// scroll to bottom
				this.div.scrollTop = this.div.scrollHeight;
			}
		});
	}
}
