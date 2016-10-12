chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener(function(obj) {
  chrome.storage.sync.set({
    imdbOption: false,
    hoverInfoOption: true
  });
});
