window.addEventListener("error", (e) => {
	try {
		let _id = randomId();
		new OSWindow(
			_id,
			"Error",
			`
            <p class="ui-window-text">Something went wrong in '${e.filename.split("/").pop()}'\n Please report this error to the developer.</p><p class="ui-window-text">${e.message.toString()} (${e.lineno}:${e.colno})</p>
            <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">abort</button></div>
            `,
			400,
			220,
			1,
			true,
			true,
			true,
			true,
			false,
			0,
			0
		);

        // add event listener to the button
        document.querySelector(`.ui-window-button[data-window="${_id}"]`).addEventListener("click", () => {
            window.location.reload();
        });

	} catch (ee) {
		alert(`Something went wrong while trying to display an error window. Please report this error to the developer.\n\n${ee}`);
	}
});
