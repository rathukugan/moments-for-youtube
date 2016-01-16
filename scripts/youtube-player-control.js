// This is where youtube functionality will take place

var player = window.document.getElementById("movie_player");
//send current timestamp to content script.
window.postMessage({ type: "FROM_PAGE", text: player.getCurrentTime() }, "*");

