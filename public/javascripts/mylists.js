let listitems = document.getElementsByClassName('listEntity')
for (var i = 0; i < listitems.length; i++) {
	listitems[i].addEventListener('click', handleClick )
}

/* Youtube API use */
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function playVid( id, target ) {
  return new YT.Player(target, {
    height: '180',
    width: '100%',
    videoId: id,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// function onYouTubeIframeAPIReady( ) {
//   let videos = []
//   for (var i = 0; i < urls.length; i++) {

//     let thevid = document.createElement('div')
//     thevid.setAttribute('id', 'player' + i)
//     document.getElementById('player').appendChild(thevid)

//     let newvideo = playVid(urls[i], 'player' + i)
//     videos.push( newvideo )
//   }

// }

function renderVids( urls ) {
  let videos = []
  for (var i = 0; i < urls.length; i++) {

    let thevid = document.createElement('div')
    thevid.setAttribute('id', 'player' + i)
    document.getElementById('video-container').appendChild(thevid)

    let newvideo = playVid(urls[i], 'player' + i)
    videos.push( newvideo )
  }

}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

function handleClick(event) {

	console.log('I WAS CLICKED!!!!!', event.target.getAttribute('data-post'))
	// $.post( url, data, callback) -> AJAX POST request
	// $.get(url, data, callback) -> AJAX GET request - data is usually not used
	
	/* Asynchronously get video list for selected list in mylists */
	let urls = $.post( '/lists/getVideos', { id : event.target.getAttribute('data-post') }, urls => { 
		document.getElementById('video-container').innerHTML = ''
		renderVids(urls)

	})

}

/* Getting user's location */
/* navigator.geolocation.getCurrentPosition(console.log.bind(console)) */