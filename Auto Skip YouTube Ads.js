// ==UserScript==
// @name         Auto Skip YouTube Ads 
// @version      1.0.1
// @description  Speed up and skip YouTube ads automatically 
// @author       jso8910
// @match        *://*.youtube.com/*
// @exclude      *://*.youtube.com/subscribe_embed?*
// ==/UserScript==
const observer = new MutationObserver(() => {
    const skip = document.querySelector('.videoAdUiSkipButton,.ytp-ad-skip-button');
    if (skip) {
        skip.click();
    }
});

let interval = setInterval(() => {
    if (document.querySelector('#content')) {
        observer.observe(document.querySelector('#content'), {attributes: false, characterData: false, childList: true, subtree:true});
        clearInterval(interval);
    }
}, 500);


/*setInterval(() => {
    let button = document.querySelector('.videoAdUiSkipButton,.ytp-ad-skip-button');
    if (button) {
        button.click();
    }
}, 500);*/