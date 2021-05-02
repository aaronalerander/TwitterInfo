// Called when the user clicks on the browser action.
main = document.getElementById("text");
button = document.getElementById("startButton");

button.onclick = (event) => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { command: "openModal" });
  });
};

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var activeTab = tabs[0];
  console.log(activeTab);
  currentTab = activeTab.url;
  if (currentTab.includes("https://twitter.com/home")) {
    main.innerHTML = "New need to be on a user profile to activate";
    button.disabled = true;
  }
});
