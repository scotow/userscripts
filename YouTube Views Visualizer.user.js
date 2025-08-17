// ==UserScript==
// @name         YouTube Views Visualizer
// @namespace    https://japnaa.github.io/Userscripts/
// @version      1.1
// @description  Highlights videos with more views
// @author       JaPNaA
// @match        *://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    const body = document.body;
    let timeoutHandle = -1;

    function updateElm() {
        disconnect();

        const elms = document.querySelectorAll(".yt-lockup-view-model-wiz__metadata .yt-lockup-metadata-view-model-wiz__text-container .yt-content-metadata-view-model-wiz__metadata-row:nth-of-type(2) .yt-content-metadata-view-model-wiz__metadata-text:nth-of-type(1)");
        const map = new Map();
        let max = -1;
        let min = Infinity;

        for (const elm of elms) {
            if (elm.offsetParent === null) { continue; } // ignore if not visible

            const [viewsStr, theStringViews] = elm.innerText.split(" ");
            const lastChar = viewsStr[viewsStr.length - 1];
            const baseViews = parseFloat(viewsStr.replace(/[^\d.]+/g, ""));
            let views;

            if (isNaN(baseViews) || !(["views", "回視聴"].includes(theStringViews))) { continue; }

            const lastCharExpMap = {
                B: 1e9,
                M: 1e6,
                K: 1e3,
                "万": 1e4,
                "億": 1e8
            };

            views = baseViews * (lastCharExpMap[lastChar] || 1);

            if (views > max) { max = views; }
            if (views < min) { min = views; }

            map.set(elm, views);
        }

        const maxLog = Math.log(max);
        const minLog = Math.log(min);
        const logRange = maxLog - minLog;
        const darkMode = document.documentElement.getAttribute("dark") === "true";

        for (const [elm, views] of map) {
            const norm = (Math.log(views) - minLog) / logRange;
            const hue = norm * 264;
            let lightness;
            if (darkMode) {
                lightness = 40 + norm * 35;
            } else {
                lightness = 40 - norm * 20;
            }

            elm.style.color = `hsl(${hue},100%,${lightness}%)`;
        }

        observe();
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
    observe();
})();