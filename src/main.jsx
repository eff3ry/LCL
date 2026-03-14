import { render } from "preact";
import Neutralino from "@neutralinojs/lib";
import App from "./App.jsx";

import { startMusic } from "./core/music.js";

Neutralino.init();

render(<App />, document.getElementById("app"));

setTimeout(() => { // once anims done
    startMusic();
}, 1600);