var hoverInfo;
var imdbLinks;

chrome.storage.sync.get("hoverInfoOption", function(result) {
  hoverInfo = result.hoverInfoOption;
});

chrome.storage.sync.get("imdbOption", function(result) {
  imdbLinks = result.imdbOption;
});

$( document ).ready(function() {
  // Set up popup box if enabled
  if (hoverInfo) {
    addPopup();

    $( ".now-thumbnail[data-episode]" ).hover(function(e) {
      if (setPopupInfo($( this ))) {
        $( ".helperBox" ).show();
      }
    }, function() {
      $( ".helperBox" ).hide();
    });

    $( ".now-thumbnail[data-episode]").mousemove(function(e) {
      $( ".helperBox" ).css('top', e.pageY + 5)
                   .css('left', e.pageX + 5)
    });

    // Hide popup box when over special buttons
    $( "div.arrow, div.recon" ).hover(function() {
      $( ".helperBox" ).hide();
    }, function() {
      $( ".helperBox" ).show();
    });
  }

  // Add IMDB links if enabled
  if (imdbLinks) {
    addIMDB();
  }
});

function setPopupInfo(obj) {
  var type = $( obj ).attr('data-assettype');
  var data = $.parseJSON($( obj ).attr('data-asset'));

  if (type === 'episode') {
    $( '.helperBox' ).html(function() {
      var description = data.description;
      var title = data.title;
      var runtime = Math.floor(data.duration / 60);

      var episodeInfo = [];

      // Check for valid runtime
      if (isNaN(runtime)) {
        // Runtime is bad, so don't use it
        episodeInfo.push('<h1>' + title + '</h1>');
        episodeInfo.push('<hr>');
        episodeInfo.push('<p>' + description + '</p>');
      } else {
        // Runtime is good, so add that to heading
        episodeInfo.push('<h1>' + title + ' (' + runtime + ' minutes)</h1>');
        episodeInfo.push('<hr>');
        episodeInfo.push('<p>' + description + '</p>');
      }

      return episodeInfo.join('');
    });
    return true;
  } else {
    return false;
  }
}

function addPopup() {
  var popupHTML = '<div class="helperBox"></div>';
  $( "body" ).append(popupHTML);
}

function addIMDB() {
  $( 'div.now-credits > div > ul > li > .right' ).wrapInner(function() {
    var name = $( this ).attr('title');
    return '<a class="imdbLink" href="http://www.imdb.com/find?ref_=nv_sr_fn&q=' + encodeURI(name) + '" target="_blank"></a>';
  });
}

function htmlEntities(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
