const HOME_PAGE = "https://twitter.com/home";
textBody = document.getElementById("textBody");
addProfileButton = document.getElementById("addProfileButton");

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var activeTab = tabs[0];
  currentTab = activeTab.url;
  if (currentTab.includes(HOME_PAGE)) {
    addProfileButton.disabled = true;
    textBody.innerHTML =
      "Navigate to user profile page to add their data to your google sheet";
  }
});

addProfileButton.onclick = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
      sheetId = document.getElementById("sheetId").value;
      chrome.tabs.sendMessage(activeTab.id, {
        command: "addProfileData",
        sheetId,
        auth_token,
      });
    });
  });
};
