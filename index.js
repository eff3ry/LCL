const { app, BrowserWindow, Menu } = require('electron');
const remoteMain = require('@electron/remote/main');

remoteMain.initialize();

let mainWindow;
let aboutOpen = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        minHeight: 500,
        minWidth: 800,
        frame: false,
        titleBarStyle: 'hidden',
        roundedCorners: false,
        titleBarOverlay: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    };

    remoteMain.enable(mainWindow.webContents);
    mainWindow.loadFile('src/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

function createAboutWindow() {
    if (aboutOpen) return;
    aboutOpen = true;

    const about = new BrowserWindow({
        width: 400,
        height: 450,
        resizable: false,
        minimizable: false,
        maximizable: false,
        parent: mainWindow,
        modal: true,
        show: false,
        frame: false,
        titleBarStyle: 'hidden',
        roundedCorners: false,
        titleBarOverlay: false,
        transparent: false,
        backgroundColor: '#121212',
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    remoteMain.enable(about.webContents);
    about.loadFile('src/subpages/about.html');

    about.once('ready-to-show', () => {
        about.show();
    });
    about.on('hide', () => {
        about.close(); 
    });
    about.on('close', () => {
        aboutOpen = false;
    });
};

app.on('ready', () => {
    createWindow();

    const isMac = process.platform === 'darwin';

    const template = [
        ...(isMac ? [
            {
                label: app.name,
                submenu: [
                    {
                        label: 'About LC Launcher',
                        click: createAboutWindow
                    },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideOthers' },
                    { role: 'unhide' },
                    { type: 'separator' },
                    { role: 'quit' }
                ]
            },
            {
                label: 'Edit',
                submenu: [
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' }
                ]
            }
        ] : [
            {
                label: 'About PaperCut',
                click: createAboutWindow
            }
        ]),
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', function () {
    app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});