import Button from "../components/Button.jsx";

export default function OptionsMenu({ setMenu }) {
    return (
        <>
            <div id="top-bar">
                <div></div>
                <div id="main-actions">
                    <Button id="back-button" onclick={() => setMenu('main')}>
                        <img id="back-icon" src="./assets/buttons/close.svg" draggable={false} />
                    </Button>
                </div>
            </div>
        </>
    );
};