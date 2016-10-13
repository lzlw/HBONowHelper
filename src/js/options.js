function saveOptions() {
  var imdb = document.getElementById('imdb').checked;
  var hoverInfo = document.getElementById('hoverinfo').checked;

  chrome.storage.sync.set({
    imdbOption: imdb,
    hoverInfoOption: hoverInfo
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function() {
      status.textContent = '';
    }, 1500);
  });
}

function loadOptions() {
  chrome.storage.sync.get({
    imdbOption: true,
    hoverInfoOption: true
  }, function(items) {
    document.getElementById('imdb').checked = items.imdbOption;
    document.getElementById('hoverinfo').checked = items.hoverInfoOption;
  });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
