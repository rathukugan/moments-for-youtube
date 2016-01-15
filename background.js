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
            pageUrl: { urlContains: 'youtube.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
        //here control which icon shows depending on if they have saved timestamps for this url
      }
    ]);
  });
});


/*
//Test content script
chrome.pageAction.onClicked.addListener(function(tab) {  
  chrome.tabs.executeScript(null, {file: "content.js"});
});
*/