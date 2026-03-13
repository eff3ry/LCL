import Neutralino from "@neutralinojs/lib";

import { setupWindow } from "./window/window.js";
import { startMusic } from "./app/music.js";

Neutralino.init();

setupWindow();

setTimeout(() => document.querySelector("#main").classList.remove("open-anim"), 2000);

setTimeout(() => { // once anim done
    startMusic();
}, 1600);