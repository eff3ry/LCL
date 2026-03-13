import Neutralino from "@neutralinojs/lib";

export async function preventInspect() {
    // Debug Mode right click for inspect element
    // Shift + 1 to allow right click
    let isDebugOn = false;
    let debugKey = "Digit1";
    window.addEventListener("keydown", function(e) {
        if (e.shiftKey && e.code === debugKey && isDebugOn === false) {
            (async () => {
                await Neutralino.os.showNotification('Debug Mode', 'You have enabled debug mode until you restart LC Launcher', 'WARNING');
                isDebugOn = true;
            })();
        };
    });
    window.addEventListener("contextmenu", function(e) {
        if (!isDebugOn) e.preventDefault();
    }, false);
    console.log("Listening for Debug Keybind");
};