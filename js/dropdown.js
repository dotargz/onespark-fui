// Get all elements with class "dropdown"
var dropdowns = document.getElementsByClassName("dropdown");

const isHover = (e) => e.parentElement.querySelector(":hover") === e;

// Loop through each dropdown
for (var i = 0; i < dropdowns.length; i++) {
	// Add a "mouseover" event listener to show the options
	dropdowns[i].addEventListener("mouseover", function () {
		// Close all other active dropdowns
		closeAllDropdowns();
		this.classList.add("active");
	});

	// Add a "mouseout" event listener to hide the options with a delay
	dropdowns[i].addEventListener("mouseout", function (e) {
		var dropdown = this;
		setTimeout(function () {
			if (!isHover(dropdown)) {
				dropdown.classList.remove("active");
			}
		}, 75); // Adjust the delay time in milliseconds (in this example, 75ms)
	});
}

// Function to close all active dropdowns
function closeAllDropdowns() {
	for (var i = 0; i < dropdowns.length; i++) {
		dropdowns[i].classList.remove("active");
	}
}

document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
	document.getElementById("contextMenu").style.display = "none";
}

function rightClick(e) {
	e.preventDefault();

	if (document.getElementById("contextMenu").style.display == "flex") hideMenu();
	else {
		var menu = document.getElementById("contextMenu");

		menu.style.display = "flex";
		menu.style.left = e.pageX + "px";
		menu.style.top = e.pageY + "px";
	}
}
