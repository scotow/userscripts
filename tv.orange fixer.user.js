// ==UserScript==
// @name        tv.orange fixer
// @description This is your new file, start writing code
// @match       https://tv.orange.fr/*
// ==/UserScript==

let intervalId = null;

function videoLoaded(videoEl) {
    // Wait a bit before tweaking the settings. The original JS changes it too.
    setTimeout(() => {
        videoEl.muted = JSON.parse(localStorage.getItem('muted') || 'true');
        videoEl.volume = JSON.parse(localStorage.getItem('volume') || '0.3');
    }, 1000);

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        localStorage.setItem('muted', JSON.stringify(videoEl.muted));
        localStorage.setItem('volume', JSON.stringify(videoEl.volume));
    }, 1000);
}

function videoRemoved(videoEl) {
    localStorage.setItem('muted', JSON.stringify(videoEl.muted));
    localStorage.setItem('volume', JSON.stringify(videoEl.volume));
    clearInterval(intervalId);
    intervalId = null;
}

function findVideoEl(nodeList) {
    for (node of nodeList) {
        if (!node.querySelector) {
            continue;
        }
        let videoEl = node.querySelector('video.video-element');
        if (videoEl) {
            return videoEl;
        }
    }
}

const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
        let added = findVideoEl(mutation.addedNodes);
        if (added) {
            videoLoaded(added);
        }
        let removed = findVideoEl(mutation.removedNodes);
        if (removed) {
            videoRemoved(removed);
        }
    }
});
observer.observe(document, {
    childList: true,
    subtree: true
});