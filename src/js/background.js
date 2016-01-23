//Starter code pulled from Google's pageaction_by_url extension example.

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {  
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains 'youtube.com'...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'youtube.com' }, //add /watch?v=  here
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
        //here control which icon shows depending on if they have saved timestamps for this url
      }
    ]);
  });
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //regex match for valid youtube stamp from content script
    var pattern = /t=(\d*\dh)*(\d*\d)m(\d\d)s/i;

    if (pattern.test(request.timeStamp))

      chrome.tabs.query({
        active: true,               // Select active tabs
        lastFocusedWindow: true     // In the current window
        }, function(array_of_Tabs) {
            // Since there can only be one active tab in one active window, 
            //  the array has only one element
            var tab = array_of_Tabs[0];
            var url = tab.url;
            alert(url + "&" + request.timeStamp);
        });
  });


/*
//Test content script
chrome.pageAction.onClicked.addListener(function(tab) {  
  chrome.tabs.executeScript(null, {file: "content.js"});
});
*/