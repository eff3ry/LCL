import * as Neutralino from "./vendor/neutralino/neutralino.mjs";

import { setupWindow } from "./window/window.js";
import { startMusic } from "./app/music.js";

Neutralino.init();

setupWindow();

setTimeout(() => { // once anim done
    document.querySelector("#main").classList.remove("open-anim");
    startMusic();
}, 1600);