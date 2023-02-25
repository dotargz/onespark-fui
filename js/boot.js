function onStart() {
    if (windowStorage.anyWindows() === false) {
    
        OSPrograms.welcome();
    
    } else {
        windowStorage.loadAllWindows();
    }
}

document.addEventListener("DOMContentLoaded", onStart);