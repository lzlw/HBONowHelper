var hoverInfo;
var imdbLinks;

chrome.storage.sync.get("hoverInfoOption", function(result) {
  hoverInfo = result.hoverInfoOption;
});

chrome.storage.sync.get("imdbOption", function(result) {
  imdbLinks = result.imdbOption;
});

$( document ).ready(function() {
  if (hoverInfo) {
    addPopup();

    $( ".now-thumbnail[data-episode]" ).hover(function(e) {
      if (setPopupInfo($( this ))) {
        $( ".helperBox" ).show();
      }
    }, function() {
      $( ".helperBox" ).hide();
    });

    $( ".now-thumbnail[data-episode]").mousemove(function (e) {
      $( ".helperBox" ).css('top', e.pageY + 5)
                   .css('left', e.pageX + 5)
    });
  }

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
      var runtime = Math.floor(data.duration / 60) + ' minutes';

      return [
        '<h1>' + title + ' (' + runtime + ')</h1>',
        '<hr>',
        '<p>' + description + '</p>'
      ].join('');
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
