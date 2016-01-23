// This is where youtube functionality will take place

//modified from http://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
//to follow youtube timestamp format (ex: t=1h20m5s)
function secondsToHMS(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + "h" + (m < 10 ? "0" : "") : "") + m + "m" + (s < 10 ? "0" : "") + s) + "s"; 
}

var player = window.document.getElementById("movie_player");
//send current timestamp to content script.
window.postMessage({ type: "FROM_PAGE", text: secondsToHMS(player.getCurrentTime()) }, "*");

