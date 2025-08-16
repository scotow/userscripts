// ==UserScript==
// @name        Youtube PiP - Enable Picture-in-Picture(PiP) mode on Youtube
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch*
// @grant       none
// @version     1.12
// @author      IVSnote App
// @description Enable in-build youtube pip mode.
// @description:zh 開啟內建 Youtube 子母畫面支援。
// ==/UserScript==

const pipbtn = document.getElementsByClassName('ytp-pip-button ytp-button')[0];
pipbtn.style.removeProperty('display');
pipbtn.style.transform = 'scale(0.82)';