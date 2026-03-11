const { app, shell, getCurrentWindow } = require('@electron/remote');

document.getElementById("version").textContent =
    "Version " + app.getVersion();

document.getElementById("platform").textContent =
    `${process.platform} (${process.arch})`;

document.getElementById("electron").textContent =
    process.versions.electron;

document.getElementById("chromium").textContent =
    process.versions.chrome;

document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        shell.openExternal(link.href);
    });
});