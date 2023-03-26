function randomId() {
	const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
	return uint32.toString(16);
}

function onStart() {
	try {
        // first program to start
		OSPrograms.welcome();
	} catch (e) {
		console.error(e);
        let _id = randomId();
		new OSWindow(_id, "Error", `
        <p class="ui-window-text">Something went wrong while starting the OS. Please report this error to the developer.</p><p class="ui-window-text">${e}</p>
        <div class="ui-window-buttons"><button class="ui-window-button" data-window="${_id}">abort</button><button class="ui-window-button" data-window="${_id}">retry</button></div>
        `, 400, 175, 1, true, true, true, true, false, 0, 0);
	}
}

document.addEventListener("DOMContentLoaded", onStart);
