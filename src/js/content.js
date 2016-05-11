//Work around content script's living an "isolated world"
//From StackOverflow: http://stackoverflow.com/a/9517879/3309046

//modified from http://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
//to follow youtube timestamp format (ex: t=1h20m5s)
function secondsToHMS(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + "h" + (m < 10 ? "0" : "") : "") + m + "m" + (s < 10 ? "0" : "") + s) + "s"; 
}

function injectScript(func) {
    var actualCode = '(' + func + ')();';
    var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	//script.parentNode.removeChild(script);
}

//Only need one listener, to receive timestamps and send to bg
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
  	//send to background script
  	chrome.runtime.sendMessage({timeStamp: "t=" + secondsToHMS(event.data.text)}, function(response) {});

  	//chrome.runtime.sendMessage({timeStamp: "t=" + event.data.text}, function(response) {});

  	  	// Save it using the Chrome extension storage API.
    //chrome.storage.sync.set({'INSERT URL HERE': event.data.text}, function() {});
  }
}, false);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "requestStamp") {
        	injectScript(function() {
			   window.postMessage({type: "FROM_PAGE", text: window.document.getElementById("movie_player").getCurrentTime()}, "*");
			});
			
			/*
			var time = 60;
        	
			var actualCode = '(' + function(time) { 
				window.document.getElementById("movie_player").seekTo(time);
			} + ')(' + JSON.stringify(time) + ')';

			var script = document.createElement('script');
			script.textContent = actualCode;
			(document.head||document.documentElement).appendChild(script);
			*/
        }
});

        	/*
    		var s = document.createElement('script');
			s.src = chrome.extension.getURL('src/js/youtube-player-control.js');
			s.onload = function() { this.parentNode.removeChild(this); };
			(document.head||document.documentElement).appendChild(s);
            */

