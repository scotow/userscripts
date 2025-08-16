// ==UserScript==
// @name         YouTube Time Spent Display
// @namespace    https://japnaa.github.io/Userscripts/
// @version      0.1
// @description  Displays the amount of time you've been on youtube for
// @author       JaPNaA
// @match        https://*.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    const localStorageKey = "tm_youtube_time_tracker_data";
    const elm = document.createElement("div");
    elm.style = `
position: fixed;
bottom: 0;
right: 0;
padding: 8px;
background-color: #000;
color: #fff;
z-index: 999;
`;
    document.body.appendChild(elm);

    initLocalStorage();
    update();
    setInterval(() => update(), 20e3);
    addEventListener("beforeunload", () => unloadHandler());
    elm.addEventListener("dblclick", () => {
        if (confirm(`Reset time spent?
Verify:
1. All YouTube tabs are closed (expect this)
2. You aren't trying to cheat the system
  a. You are doing this because the script bugged out`)) {
            reset();
        }
    });

    function initLocalStorage() {
        const data = getLocalStorage();
        if (data.sessionsCount !== undefined && !isNaN(data.sessionsCount) && data.sessionsCount > 0) {
            data.sessionsCount++;
        } else {
            data.sessionsCount = 1;
            if (data.expireTime === undefined || isNaN(data.expireTime) || Date.now() > data.expireTime) {
                data.startTime = Date.now();
                data.expireTime = Date.now() + 10 * 60e3;
            }
        }
        setLocalStorage(data);
    }

    function reset() {
        setLocalStorage({});
        location.reload();
    }

    function update() {
        elm.innerText = getTimeStr();
        elm.style.fontSize = getFontSize() + "px";
        elm.style.padding = getFontSize() * 0.8 + "px";
    }

    function getTimeStr() {
        const totalMinutes = getTimeMinutes();
        const totalHours = totalMinutes / 60;

        return Math.floor(totalHours) + "hr " + Math.floor(totalMinutes % 60) + " mins";
    }

    function getFontSize() {
        const totalMinutes = getTimeMinutes();
        return totalMinutes * 2 + 10;
    }

    function getTimeMinutes() {
        const startTime = getStartTime();
        const totalMillis = Date.now() - startTime;
        return totalMillis / 60e3;
    }

    function getStartTime() {
        return getLocalStorage().startTime;
    }

    function getExpireTime() {
        return getLocalStorage().expireTime;
    }

    function getSessionsCount() {
        return getLocalStorage().sessionsCount;
    }


    function unloadHandler() {
        const data = getLocalStorage();
        data.sessionsCount -= 1;

        if (data.sessionsCount <= 0) {
            data.expireTime = Date.now() + 10 * 60e3;
        }

        setLocalStorage(data);
    }

    function getLocalStorage() {
        try {
            return JSON.parse(localStorage[localStorageKey]);
        } catch (err) {
            return {};
        }
    }

    function setLocalStorage(data) {
        localStorage[localStorageKey] = JSON.stringify(data);
    }

})();