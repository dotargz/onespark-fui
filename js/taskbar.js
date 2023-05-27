// Listen for the custom events 'OSWindowCreated' and 'OSWindowDestroyed' and add/remove the taskbar item accordingly
const taskbar = document.getElementById("taskbar");
document.addEventListener("OSWindowCreated", (e) => {
	let window = e.detail;
	let taskbarItem = document.createElement("div");
	taskbarItem.classList.add("taskbar-item");
	taskbarItem.setAttribute("data-window", window.id);
	taskbarItem.innerHTML = window.title;
	taskbar.appendChild(taskbarItem);

	taskbarItem.addEventListener("click", () => {
		// cannot minimize important windows
		if (window.important === true) return;

		OSWindow.getWindowById(window.id).toggleMinimize();
	});

	// add support for important windows and error windows. a window cannot have both important and error classes, but it can have the value set to true for both
	if (window.important == true && window.error == false) {
		taskbarItem.classList.add("important");
	} else if (window.important == false && window.error == false) {
		taskbarItem.classList.remove("important");
		taskbarItem.classList.remove("error");
	} else if (window.important == false && window.error == true) {
		taskbarItem.classList.add("error");
	} else if (window.important == true && window.error == true) {
		// prioritize error over important
		taskbarItem.classList.add("error");
	}
});

document.addEventListener("OSWindowDestroyed", (e) => {
	let window = e.detail;
	let taskbarItem = document.querySelector(`.taskbar-item[data-window="${window.id}"]`);
	if (taskbarItem === null) return;
	taskbarItem.remove();
});

// make minimized windows greyed out
document.addEventListener("OSWindowMinimized", (e) => {
	let window = e.detail;
	let taskbarItem = document.querySelector(`.taskbar-item[data-window="${window.id}"]`);
	if (taskbarItem === null) return;
	taskbarItem.classList.add("minimized");
});

document.addEventListener("OSWindowUnminimized", (e) => {
	let window = e.detail;
	let taskbarItem = document.querySelector(`.taskbar-item[data-window="${window.id}"]`);
	if (taskbarItem === null) return;
	taskbarItem.classList.remove("minimized");
});


const startMenu = document.getElementById("taskbar-home");
startMenu.addEventListener("click", () => {
	// OSPrograms.startmenu();
});
