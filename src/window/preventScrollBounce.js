import * as Neutralino from "../vendor/neutralino/neutralino.mjs";

export async function preventScrollBounce() {
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