// ==UserScript==
// @name         PiperTwitchFix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       You
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    setInterval(() => {
        document.getElementById('PiPer_button').style.display = 'none';
    }, 15 * 1000);
})();