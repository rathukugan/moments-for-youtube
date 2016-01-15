var player = document.getElementById("movie_player");

//$('#movie_player').pauseVideo();
;(function(){
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('test.js');
	s.onload = function() { this.parentNode.removeChild(this); };
	(document.head||document.documentElement).appendChild(s);
})();
