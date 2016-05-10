//jQuery  from popup.html
$(function() {
    $('#clickme').click(function(){
        //Send msg to content script to request a time stamp
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: "requestStamp"}, function(response) {});
        });
    });
});