chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener(function(obj) {
  // Set default options
  chrome.storage.sync.set({
    imdbOption: true,
    hoverInfoOption: true
  });
});
