// ==UserScript==
// @name         YouTube Display Playback Rate
// @namespace    https://japnaa.github.io/Userscripts/
// @version      0.2
// @description  Displays the playback rate on YouTube videos
// @author       JaPNaA
// @match        https://*.youtube.com/*
// @match        https://*.youtube-nocookie.com/*
// @match        https://youtube.googleapis.com/embed/*
// @grant        none
// ==/UserScript==

(function () {
    const body = document.body;
    let timeoutHandle = -1;

    function setup() {
        const style = document.createElement("style");
        style.innerHTML = `
.tm-speed {
  font-size: 0.8em;
}
`;
        document.head.appendChild(style);
    }

    function updateElm() {
        disconnect();
        update();
        observe();
    }

    function update() {
        const video = document.querySelector("video");
        const timeDisplay = document.querySelector(".ytp-time-display");
        const liveBadge = document.querySelector(".ytp-live-badge");

        if (!video || video.dataset.tmSpeedControlsRegistered) { return; }
        video.dataset.tmSpeedControlsRegistered = true;

        const speedElm = document.createElement("span");
        speedElm.classList.add("tm-speed");
        speedElm.style.fontSize = "0.8em";

        function setSpeedText(speed) {
            if (speed == "1") {
                speedElm.innerText = "";
            } else {
                speedElm.innerText = " x " + speed;
            }
        }

        timeDisplay.insertBefore(speedElm, liveBadge);
        setSpeedText(video.playbackRate);

        video.addEventListener("ratechange", function () {
            setSpeedText(video.playbackRate);
        });
    }


    function updateElmOnTimeout() {
        clearTimeout(timeoutHandle);
        timeoutHandle = setTimeout(function () {
            updateElm();
        }, 100);
    }

    const observer = new MutationObserver(function (mutations) {
        updateElmOnTimeout();
    });

    function observe() {
        observer.observe(body, {
            childList: true,
            subtree: true,
            attributes: false
        });
    }

    function disconnect() {
        observer.disconnect();
    }

    updateElm();
    setup();
    observe();
})();