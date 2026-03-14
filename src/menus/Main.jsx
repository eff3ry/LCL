import "./Main.css";

import Button from "../components/Button.jsx";

export default function MainMenu({ setMenu }) {
    return (
        <>
            <div id="top-bar">
                <div id="accounts">
                    <img id="account-icon" src="./assets/icons/account.png" draggable={false} />
                    <div id="account-details">
                        <h1>TheHuckle</h1>
                        <h2>Offline Account</h2>
                    </div>
                </div>
                <div id="main-actions">
                    <Button id="news-button">
                        <img src="./assets/buttons/news.svg" draggable={false} />
                    </Button>
                    <Button id="options-button" onclick={() => setMenu('options')}>
                        <img src="./assets/buttons/options.svg" draggable={false} />
                    </Button>
                </div>
            </div>
            <div id="bottom-bar">
                <img id="main-logo" src="./assets/minecraftlogo.png" draggable={false} />
                <div id="launch-options-bar">
                    <div id="instances">
                        <img id="instance-icon" src="./assets/icons/instance.png" draggable={false} />
                        <div id="instance-details">
                            <h1>Nightly</h1>
                            <h2>1.10.7</h2>
                        </div>
                    </div>
                    <div id="main-actions">
                        <Button id="discover-button">
                            <img src="./assets/buttons/discover.svg" draggable={false} />
                        </Button>
                        <Button id="play-button">
                            Play
                        </Button>
                        <Button id="servers-button">
                            <img src="./assets/buttons/servers.svg" draggable={false} />
                        </Button>
                    </div>
                    <div id="stats">
                        <h1>Playtime</h1>
                        <h2>32d 1h 30m</h2>
                    </div>
                </div>
            </div>
        </>
    );
};