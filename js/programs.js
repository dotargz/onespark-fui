function randomId() {
	const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
	return uint32.toString(16);
}

const OSPrograms = {
	welcome: function () {
        // create a new window with the new OSWindow class
        let _id = randomId();
		this.welcome.self = new OSWindow(
			_id,
			"welcome!",
			`<p class="ui-window-text">Welcome to the best browser-based OS ever! You can drag the windows around, and you can minimize, maximize, and close them.</p>
        <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">okay</button><button class="ui-window-button" data-window="${_id}">close</button></div>`,
			300,
			210,
			2,
			true,
			true
		);

		// close the window when the okay button is clicked (use the data-window attribute to get the window id) use destroyWindowWithId(id) to destroy the window
        this.welcome.self.window.querySelector(".ui-window-button").addEventListener("click", () => {
            OSWindow.destroyWindowById(_id);
        });
        this.welcome.self.window.querySelector(".ui-window-button:nth-child(2)").addEventListener("click", () => {
            OSWindow.destroyWindowById(_id);
        });

	},

    textEditor: function () {
        let _id = randomId();
        this.textEditor.self = new OSWindow(
            _id,
            "text editor",
            `<textarea class="ui-window-textarea" data-window="${_id}"></textarea>`,
            300,
            210,
            2,
            true,
            true
        );

        this.textEditor.self.window.querySelector(".ui-window-textarea").addEventListener("input", () => {
            localStorage.setItem("textEditor-" + _id, this.textEditor.self.window.querySelector(".ui-window-textarea").value);
        });

        this.textEditor.self.window.querySelector(".ui-window-textarea").value = localStorage.getItem("textEditor");
    },

	launcher: function () {
        let _id = randomId();
		this.launcher.self = new OSWindow(
            _id,
			"run program",
			`
            <p class="ui-window-text">welcome! <button class="ui-window-button launch-welcome">launch</button></p>
            <p class="ui-window-text">flappy bird <button class="ui-window-button launch-flappybird">launch</button></p>
            <p class="ui-window-text">text editor <button class="ui-window-button launch-calc">launch</button></p>
            `,
			300,
			200,
			2,
			true,
			true
		);

		this.launcher.self.window.querySelector(".launch-welcome").addEventListener("click", () => {
            OSPrograms.welcome();
        });

        this.launcher.self.window.querySelector(".launch-flappybird").addEventListener("click", () => {
            OSPrograms.flappybird();
        });

        this.launcher.self.window.querySelector(".launch-calc").addEventListener("click", () => {
            OSPrograms.textEditor();
        });
	},
};

const OSFunctions = {
    clearStorage: function () {
        localStorage.clear();

        // reload the page
        window.location.reload();
    }
};

