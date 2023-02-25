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
		window.window.classList.toggle("minimized");

        // trigger window minimized event
        document.dispatchEvent(new CustomEvent("OSWindowMinimized", { detail: window }));
	});
});

document.addEventListener("OSWindowDestroyed", (e) => {
	let window = e.detail;
	let taskbarItem = document.querySelector(`.taskbar-item[data-window="${window.id}"]`);
	taskbarItem.remove();
});

// make minimized windows greyed out
document.addEventListener("OSWindowMinimized", (e) => {
    let window = e.detail;
    let taskbarItem = document.querySelector(`.taskbar-item[data-window="${window.id}"]`);
    taskbarItem.classList.toggle("minimized");
});

