import { useState } from "preact/hooks";

import Window from "./components/Window.jsx";
import Toast from "./components/Toast.jsx";

import MainMenu from "./menus/Main.jsx";
import OptionsMenu from "./menus/Options.jsx";
import AboutMenu from "./menus/About.jsx";

export default function App() {
    const [menu, setMenu] = useState("main");

    return (
        <>
            <Window title="" setMenu={setMenu}>
                {menu === "main" &&     <MainMenu setMenu={setMenu} />}
                {menu === "options" &&  <OptionsMenu setMenu={setMenu} />}
                {menu === "about" &&    <AboutMenu setMenu={setMenu} />}
            </Window>

            <Toast />
        </>
    );
};