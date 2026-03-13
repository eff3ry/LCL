const toast = document.getElementById("toast");

const queue = [];
let showing = false;

export function showToast(message, duration = 2500) {
    queue.push({ message, duration });
    if (!showing) processQueue();
};

function processQueue() {
    if (queue.length === 0) return showing = false;
    showing = true;

    const { message, duration } = queue.shift();

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => processQueue(), 400);
    }, duration);
};