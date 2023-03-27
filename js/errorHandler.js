const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");

window.addEventListener("error", (e) => {
	try {
		// if file doesnt end with .js, then ignore
		if (!e.filename.endsWith(".js")) return;
		let _id = OSFirmware.randomId();
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
		window.location.href = `fatalerror.html?filename=${ee.filename}&message=${ee.message}&lineno=${ee.lineno}&colno=${ee.colno}&errorcode=${"0x" + genRanHex(8)}`;
	}
});
