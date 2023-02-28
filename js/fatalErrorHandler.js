// get error details from GET parameters
let errorDetails = window.location.search;
if (errorDetails !== "") {
	// remove the ? from the beginning of the string
	errorDetails = errorDetails.substring(1);
	// split the string into an array
	errorDetails = errorDetails.split("&");
	// create an object to store the error details
	let errorDetailsObject = {};
	// loop through the array and add the values to the object
	for (let i = 0; i < errorDetails.length; i++) {
		let key = errorDetails[i].split("=")[0];
		let value = errorDetails[i].split("=")[1];
		errorDetailsObject[key] = value;
	}

	// add html to main
	document.querySelector("main").innerHTML = `
    <div class="error-title">
        onespark ui ~ fatal error
    </div>
	<div class="error-body">
		<p>onespark ui has encountered fatal error and must close.</p>
		<p>error code: <span class="error-code">${errorDetailsObject.errorcode}</span></p>
		<p>error message: <span class="error-message">${decodeURI(errorDetailsObject.message)}</span></p>
		<p>error details: <span class="error-details">${errorDetailsObject.filename} (${errorDetailsObject.lineno}:${errorDetailsObject.colno})</span></p>
        <div class="ui-window-buttons"><button class="ui-window-button" data-window="fatalerror">reload</button></div>
	</div>
    `;

    // add event listener to the button
    document.querySelector(`.ui-window-button[data-window="fatalerror"]`).addEventListener("click", () => {
        window.location.href = "/";
    });
} else {
    // add html to main
    document.querySelector("main").innerHTML = `
    <div class="error-title">
        onespark ui ~ fatal error
    </div>
    <div class="error-body">
        <p>onespark ui has encountered an unknown fatal error and must close.</p>
        <p>error code: <span class="error-code">0x00000000</span></p>
        <p>error message: <span class="error-message">unknown</span></p>
        <p>error details: <span class="error-details">unknown</span></p>
    </div>
    `;
}
