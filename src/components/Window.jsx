import "./Window.css";

import { useEffect, useState } from "preact/hooks";
import Neutralino from "@neutralinojs/lib";

export default function Window({ title, showClose = true, showMinimize = true, showMaximize = true, backgroundFade = true, backgroundAnimated = true, setMenu, children }) {
    const [openAnim, setOpenAnim] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setOpenAnim(false), 2000);
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        async function createMenuBar() {
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
                if (evt.detail.id == "about") setMenu('about');
                if (evt.detail.id == "quit") await Neutralino.app.exit();
            });
            console.log("Set Main Menu");
        };

        async function preventInspect() {
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

        async function preventScrollBounce() {
            // stop annoying scroll bounce
            function hasScrollableParent(e) {
                return e.composedPath().some(el => {
                    if (!(el instanceof HTMLElement)) return false;

                    const style = getComputedStyle(el);
                    const overflowY = style.overflowY;

                    return (
                        (overflowY === 'auto' || overflowY === 'scroll') &&
                        el.scrollHeight > el.clientHeight
                    );
                });
            };

            window.addEventListener('wheel', (e) => {
                if (!hasScrollableParent(e)) e.preventDefault();
            }, { passive: false });
            console.log("Prevented Scroll Bounce");
        };

        async function setupWindow() {
            createMenuBar();
            preventInspect();
            preventScrollBounce();

            await Neutralino.window.setDraggableRegion("window-title");

            toggleMaxRestoreButtons();

            Neutralino.events.on("windowMaximize", toggleMaxRestoreButtons);
            Neutralino.events.on("windowRestore", toggleMaxRestoreButtons);
        };

        async function toggleMaxRestoreButtons() {
            if (await Neutralino.window.isMaximized()) {
                document.body.classList.add("maximized");
            } else {
                document.body.classList.remove("maximized");
            };
        };

        setupWindow();
    }, []);

    return (
        <>
            <div id="window-background" class={`${backgroundFade ? "fade" : ""} ${backgroundAnimated ? "animated" : ""}`}><div></div></div>

            <header id="titlebar">
                <div id="drag-region">

                    <div id="window-title">
                        <span>{title}</span>
                    </div>

                    <div id="window-controls">

                        {showMinimize &&
                            <div class="button" id="min-button" onClick={() => Neutralino.window.minimize()}>
                                <img class="icon" src="../assets/window/min.png" draggable={false} />
                            </div>
                        }
                        {showMaximize &&
                            <div class="button" id="max-button" onClick={() => Neutralino.window.maximize()}>
                                <img class="icon" src="../assets/window/max.png" draggable={false} />
                            </div>
                        }
                        {showMaximize &&
                            <div class="button" id="restore-button" onClick={() => Neutralino.window.unmaximize()}>
                                <img class="icon" src="../assets/window/restore.png" draggable={false} />
                            </div>
                        }
                        {showClose &&
                            <div class="button" id="close-button" onClick={() => Neutralino.app.exit()}>
                                <img class="icon" src="../assets/window/close.png" draggable={false} />
                            </div>
                        }

                    </div>
                </div>
            </header>

            <div id="main" class={openAnim ? "open-anim" : ""}>
                {children}
            </div>
        </>
    );
};