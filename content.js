chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command === "addProfileData") {
    let { sheetId, auth_token } = msg;
    let twitterInfo = collectData();
    sendToSheet(sheetId, auth_token, twitterInfo);
    response(true);
  }
});

sendToSheet = (sheetId, auth_token, twitterInfo) => {
  let range = "Sheet1!A1:B5";
  let url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW`;

  let fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({
      range: range,
      majorDimension: "ROWS",
      values: [
        [
          twitterInfo.link,
          twitterInfo.name,
          twitterInfo.handel,
          twitterInfo.followers,
          twitterInfo.bio,
        ],
      ],
    }),
  };

  fetch(url, fetchOptions).then((res) => res.json());
};

collectData = () => {
  let name = document.getElementsByClassName(
    "css-901oao r-1fmj7o5 r-1qd0xha r-adyw6z r-1vr29t4 r-135wba7 r-bcqeeo r-1udh08x r-qvutc0"
  )[0].firstChild.innerText;

  /*let handel = document.getElementsByClassName(
    "css-901oao css-bfa6kz r-9ilb82 r-18u37iz r-1qd0xha r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"
  )[0].innerText;*/

  let handel = document.getElementsByClassName(
    "css-901oao css-bfa6kz r-9ilb82 r-18u37iz r-1qd0xha r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"
  )[1].innerText;

  let followers = document.getElementsByClassName(
    "css-901oao css-16my406 r-1fmj7o5 r-poiln3 r-b88u0q r-bcqeeo r-qvutc0"
  )[1].innerText;

  // bioHtmlArray = document.getElementsByClassName(
  //   "css-901oao r-1fmj7o5 r-1qd0xha r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"
  // )[2].children;

  let bioHtmlArray = document.getElementsByClassName(
    "css-901oao r-1fmj7o5 r-1qd0xha r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"
  )[1].children;

  let bio = "";

  for (i = 0; i < bioHtmlArray.length; i++) {
    bio += bioHtmlArray[i].outerText;
  }

  let link = window.location.href;

  let object = {
    name,
    handel,
    followers,
    bio,
    link,
  };

  return object;
};

/*chrome.extension.sendMessage({}, function (response) {
  let flag = false;
  while (flag === false) {
    if (document.readyState === "complete") {
      flag = true;
      console.log("Hello. This message was sent from content.js");
    }
  }
});*/
