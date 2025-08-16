// ==UserScript==
// @name         Auto base 64 decode
// @version      0.1
// @description  try to take over the world!
// @author       Scotow
// @match        https://fora.snahp.eu/*
// @grant        none
// ==/UserScript==

const b64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
for (const elem of document.querySelectorAll('code,dd')) {
    let content = elem.textContent;
    for (let i = 0; i < 10; i++) {
        content = content.trim();
        if (content.startsWith('http://') || content.startsWith('https://')) {
            elem.textContent = content;
            break;
        }
        if (content.length === 0 || !b64Regex.test(content)) {
            break;
        }
        content = atob(content);
    }
}