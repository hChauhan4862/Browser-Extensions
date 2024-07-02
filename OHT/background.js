// chrome.runtime.onInstalled.addListener(async () => {
//   let tab = await chrome.tabs.create({ url });
//   console.log(`Created tab ${tab.id}`);
// });

chrome.action.onClicked.addListener((tab) => {
  let url = "http://omharitelecom.com"
  chrome.tabs.create({url: url});
});
