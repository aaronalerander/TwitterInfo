const HOME_PAGE = "https://twitter.com/home";
textBody = document.getElementById("errorMessage");
addProfileButton = document.getElementById("addProfileButton");
currentEndPointId = document.getElementById("currentEndPointId");
setEndPointButton = document.getElementById("setEndPointButton");

chrome.storage.local.get(["sheetId"], function (result) {
  console.log("Value currently is " + result.sheetId);
  console.log(result);
  document.getElementById("currentEndPointId").innerHTML = result.sheetId;
});

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var activeTab = tabs[0];
  currentTab = activeTab.url;
  if (currentTab.includes(HOME_PAGE)) {
    addProfileButton.disabled = true;
    textBody.innerHTML =
      "Navigate to a user profile to send profile data to your google sheet!";
  }
});

setEndPointButton.onclick = () => {
  sheetId = document.getElementById("sheetId").value;

  chrome.storage.local.set({ sheetId: sheetId }, function () {
    console.log("Value is set to " + sheetId);
  });

  document.getElementById("currentEndPointId").innerHTML = sheetId;
};

addProfileButton.onclick = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
      chrome.storage.local.get(["sheetId"], function (result) {
        sheetId = result.sheetId;

        textBody.innerHTML = "Data Sent To Your Google Sheet!";

        chrome.tabs.sendMessage(activeTab.id, {
          command: "addProfileData",
          sheetId,
          auth_token,
        });
      });
    });
  });
};
