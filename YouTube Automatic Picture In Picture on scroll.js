// ==UserScript==
// @name         YouTube Automatic Picture In Picture on scroll
// @namespace    https://japnaa.github.io/Userscripts/
// @version      0.1
// @description  Uses picture in picture when scrolled
// @author       JaPNaA
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (!document.pictureInPictureEnabled) { return; }

    addEventListener("scroll", function () {
        const video = document.querySelector("video");
        if (!video) { return; }
        const bbox = video.getBoundingClientRect();
        const my = bbox.top + bbox.height / 2;

        if (document.pictureInPictureElement) {
            if (my >= 0) {
                document.exitPictureInPicture();
            }
        } else {
            if (my < 0 && my > -200) {
                video.requestPictureInPicture();
            }
        }
    });
})();