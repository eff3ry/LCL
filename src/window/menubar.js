import Neutralino from "@neutralinojs/lib";

export async function createMenuBar() {
    if (NL_OS !== 'Darwin') return;

    const menu = [
        {
            id: 'app', text: 'LC Launcher',
            menuItems: [
                { id: 'about', text: 'About LC Launcher' },
                { id: 'quit', text: 'Quit LC Launcher', shortcut: 'Q' },
            ]
        }
    ];

    await Neutralino.window.setMainMenu(menu);
    await Neutralino.events.on('mainMenuItemClicked', async (evt) => {
        if (evt.detail.id == "quit") await Neutralino.app.exit();
    });
    console.log("Set Main Menu");
};