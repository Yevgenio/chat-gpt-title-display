// Minimal logic: extract the last chunk after common separators
let titleChanged = false;
const SEPARATORS = [" | ", " - "];

function extractChatTitle() {
    let t = (document.title || "").trim();
    for (const sep of SEPARATORS) {
        if (t.includes(sep)) {
            const parts = t.split(sep).map(s => s.trim()).filter(Boolean);
            if (parts.length > 1) return parts[parts.length - 1];
        }
    }
    return t;
}

function insertHeaderTitle(text) {
    const header = document.querySelector("header");
    if (header && text) {
        let h1 = header.querySelector("h1.chatgpt-title-cleaner");
        if (!h1) {
            h1 = document.createElement("h1");
            h1.className = "chatgpt-title-cleaner";
            // Optional inline styling
            h1.style.fontSize = "1.2rem";
            h1.style.margin = "0.5em 0";

            // Insert after first child, before the second
            if (header.children.length >= 2) {
                header.children[1].appendChild(h1);
                //header.insertBefore(h1, header.children[2]);//
            } else {
                // Fallback: just append if there isn’t a second child
                header.appendChild(h1);
            }
        }
        h1.textContent = text;
    }
}

function applyTitle() {
    const desired = extractChatTitle(document.title);
    if (desired && document.title !== desired) {
        document.title = desired;
        insertHeaderTitle(desired);
        titleChanged = true;
    }
    insertHeaderTitle(desired);
}

function waitTitleChanges() {
    setTimeout(() => {
        applyTitle();
        if(document.title === "ChatGPT") {
            // If the title is still "ChatGPT", wait for changes again
            waitTitleChanges();
        }
    }, 5000);
}

waitTitleChanges();
