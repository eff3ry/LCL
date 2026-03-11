// code modified from https://github.com/binaryfunt/electron-seamless-titlebar-tutorial. all credit given
const remote = require('@electron/remote');

const win = remote.getCurrentWindow();

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") handleWindowControls();
};

window.onbeforeunload = (event) => {
    win.removeAllListeners();
};

function handleWindowControls() {
    if (document.getElementById('min-button'))
        document.getElementById('min-button').addEventListener("click", event => win.minimize());

    if (document.getElementById('max-button'))
        document.getElementById('max-button').addEventListener("click", event => {
        if (process.platform === 'darwin') return win.setFullScreen(true);
        win.maximize();
    });

    if (document.getElementById('restore-button'))
        document.getElementById('restore-button').addEventListener("click", event => {
    if (process.platform === 'darwin') return win.setFullScreen(false);
        win.unmaximize();
    });

    if (document.getElementById('close-button'))
        document.getElementById('close-button').addEventListener("click", event => win.close());

    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);
    win.on('enter-full-screen', toggleMaxRestoreButtons);
    win.on('leave-full-screen', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized() || win.isFullScreen()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        };
    };
};