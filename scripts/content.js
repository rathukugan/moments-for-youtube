//Work around content script's living an "isolated world"
//From StackOverflow: http://stackoverflow.com/a/9517879/3309046
//Allows test.js to control youtube player

;(function(){
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('scripts/test.js');
	s.onload = function() { this.parentNode.removeChild(this); };
	(document.head||document.documentElement).appendChild(s);
})();
