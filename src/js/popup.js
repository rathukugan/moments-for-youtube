/*
function hello() {
  chrome.tabs.executeScript({
    file: 'alert.js'
  }); 
}

document.getElementById('clickme').addEventListener('click', hello);
*/
function sendClicks() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            //timestamp response from content script back not working, but regular msg is
        });
    });
}

//jQuery installed from popup.html
$(function() {
    $('#clickme').click(function(){
        sendClicks();
    });
});