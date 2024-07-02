var isCSPDisabled = false;
var tabid;
var filter = {
    urls: ["*://*/*"],
    types: ["main_frame", "sub_frame"]
};
var onHeadersReceived = function(details) {
    for (var i = 0; i < details.responseHeaders.length; i++) {
        if ('content-security-policy' === details.responseHeaders[i].name.toLowerCase()) {
            details.responseHeaders[i].value = '';
        }
    }
    return {
        responseHeaders: details.responseHeaders
    };
};

chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, filter, ["blocking", "responseHeaders"]);
// chrome.tabs.onUpdated.addListener(function (tabCloseid, changeInfo, tab) {
//   if (tabid === tabCloseid) {
//     console.log("Refresh Tab!");
//     isCSPDisabled = false;
//     updateUI();
//   }
// });