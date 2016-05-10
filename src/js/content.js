//Work around content script's living an "isolated world"
//From StackOverflow: http://stackoverflow.com/a/9517879/3309046
//Allows test.js to control youtube player

/*
;(function(){
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('scripts/test.js');
	s.onload = function() { this.parentNode.removeChild(this); };
	(document.head||document.documentElement).appendChild(s);
})();
*/

//Only need one listener, to receive timestamps and send to bg
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
  	//send to background script
  	chrome.runtime.sendMessage({timeStamp: "t=" + event.data.text}, function(response) {});
  }
}, false);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "requestStamp") {
    		var s = document.createElement('script');
			s.src = chrome.extension.getURL('src/js/youtube-player-control.js');
			s.onload = function() { this.parentNode.removeChild(this); };
			(document.head||document.documentElement).appendChild(s);
            
        //sendResponse({farewell: 'goodbye'});
        }
});