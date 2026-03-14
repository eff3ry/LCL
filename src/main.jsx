import { render } from "preact";
import Neutralino from "@neutralinojs/lib";
import App from "./App.jsx";

Neutralino.init();

render(<App />, document.getElementById("app"));