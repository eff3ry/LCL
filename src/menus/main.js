import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('lc-main')
export default class extends LitElement {
    render() {
        return html`
            <div id="top-bar">
                <div id="accounts">
                    <img id="account-icon" src="./assets/icons/account.png" draggable="false">
                    <div id="account-details">
                        <h1>TheHuckle</h1>
                        <h2>Offline Account</h2>
                    </div>
                </div>
                <div id="main-actions">
                    <div id="news-button" class="mc-button">
                        <div class="title"><img id="discover-icon" src="./assets/buttons/news.svg" draggable="false"></div>
                    </div>
                    <div id="options-button" class="mc-button">
                        <div class="title"><img id="servers-icon" src="./assets/buttons/options.svg" draggable="false"></div>
                    </div>
                </div>
            </div>
            <div id="bottom-bar">
                <img id="main-logo" src="./assets/minecraftlogo.png" draggable="false">
                <div id="launch-options-bar">
                    <div id="instances">
                        <img id="instance-icon" src="./assets/icons/instance.png" draggable="false">
                        <div id="instance-details">
                            <h1>Nightly</h1>
                            <h2>1.10.7</h2>
                        </div>
                    </div>
                    <div id="main-actions">
                        <div id="discover-button" class="mc-button">
                            <div class="title"><img id="discover-icon" src="./assets/buttons/discover.svg" draggable="false"></div>
                        </div>
                        <div id="play-button" class="mc-button">
                            <div class="title">Play</div>
                        </div>
                        <div id="servers-button" class="mc-button">
                            <div class="title"><img id="servers-icon" src="./assets/buttons/servers.svg" draggable="false"></div>
                        </div>
                    </div>
                    <div id="stats">
                        <h1>Playtime</h1>
                        <h2>32d 1h 30m</h2>
                    </div>
                </div>
            </div>
        `;
    };

    static get styles() {
        return css`
            :host {
                position: absolute;
                top: 0;
                left: 0;
                z-index: -2;
                width: 100%;
                height: 100%;
            }

            .crosshair {
                width: 16px;
                height: 16px;
                background: url('textures/1.17.1/gui/icons.png');
                background-size: 256px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
            }

            #xp-label {
                position: absolute;
                top: -8px;
                left: 50%;
                transform: translate(-50%);
                font-size: 10px;
                font-family: minecraft, mojangles, monospace;
                color: rgb(30, 250, 30);
                text-shadow: 0px -1px #000, 0px 1px #000, 1px 0px #000, -1px 0px #000;
                z-index: 10;
            }

            #xp-bar-bg {
                position: absolute;
                left: 50%;
                bottom: 24px;
                transform: translate(-50%);
                width: 182px;
                height: 5px;
                background-image: url('textures/1.16.4/gui/icons.png');
                background-size: 256px;
                background-position-y: -64px;
            }

            .xp-bar {
                width: 182px;
                height: 5px;
                background-image: url('textures/1.17.1/gui/icons.png');
                background-size: 256px;
                background-position-y: -69px;
            }

            .mobile-top-btns {
                display: none;
                flex-direction: row;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%);
                gap: 0 1px;
                z-index: 20;
            }

            .pause-btn,
            .chat-btn {
                border: none;
                outline: none;
                width: 18px;
                height: 18px;
                background-image: url('extra-textures/gui.png');
                background-size: 256px;
                background-position-x: -200px;
                background-position-y: -64px;
            }

            .chat-btn {
                background-position-y: -82px;
            }

            .mobile-control-forward,
            .mobile-control-back,
            .mobile-control-left,
            .mobile-control-sneak,
            .mobile-control-jump,
            .mobile-control-right {
                position: absolute;
                width: 22px;
                height: 22px;
                background-image: url('extra-textures/gui.png');
                background-size: 256px;
                border: none;
                outline: none;
            }

            .mobile-control-forward:active,
            .mobile-control-back:active,
            .mobile-control-sneak:active,
            .mobile-control-left:active,
            .mobile-control-jump:active,
            .mobile-control-right:active {
                filter: brightness(85%);
            }

            .mobile-control-forward {
                top: 0;
                left: 50%;
                transform: translate(-50%);
                background-position: -2px -109px;
            }

            .mobile-control-back {
                bottom: 0;
                left: 50%;
                transform: translate(-50%);
                background-position: -54px -109px;
            }

            .mobile-control-left {
                top: 50%;
                left: 0;
                transform: translate(0, -50%);
                background-position: -28px -109px;
            }

            .mobile-control-right {
                top: 50%;
                right: 0;
                transform: translate(0, -50%);
                background-position: -80px -109px;
            }

            .mobile-control-jump {
                position: relative;
                width: 18px;
                height: 18px;
                background-position: -108px -111px;
            }

            .mobile-control-sneak {
                width: 18px;
                height: 18px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-position: -218px -82px;
            }
            .mobile-control-sneak.is-down {
                background-position: -218px -64px;
            }

            .mobile-controls-left {
                display: none;
                position: absolute;
                left: 8px;
                bottom: 0;
                width: 70px;
                height: 70px;
                z-index: 30;
                opacity: 0.65;
                transform-origin: bottom left;
                transform: scale(1.5);
            }

            .mobile-controls-right {
                display: none;
                flex-direction: column;
                place-items: center;
                place-content: center;
                position: absolute;
                right: 20px;
                bottom: 0;
                width: 22px;
                height: 70px;
                z-index: 30;
                opacity: 0.65;
                transform-origin: bottom right;
                transform: scale(1.5);
            }
        `;
    };
};