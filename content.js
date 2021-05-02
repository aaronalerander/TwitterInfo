chrome.extension.sendMessage({}, function (response) {
  flag = false;
  while (flag === false) {
    if (document.readyState === "complete") {
      flag = true;
      console.log("Hello. This message was sent from content.js");
      console.log();
    }
  }

  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    console.log("hello!!!?", msg);
    collectData();
    return true;
  });

  collectData = () => {
    console.log("link ", window.location.href);

    console.log(
      "Name ",
      document.getElementsByClassName(
        "css-901oao r-1fmj7o5 r-1qd0xha r-adyw6z r-1vr29t4 r-135wba7 r-bcqeeo r-1udh08x r-qvutc0"
      )[0].firstChild.innerText
    );

    console.log(
      "@",
      document.getElementsByClassName(
        "css-901oao css-bfa6kz r-9ilb82 r-18u37iz r-1qd0xha r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"
      )[0].innerText
    );

    console.log(
      "followers ",
      document.getElementsByClassName(
        "css-901oao css-16my406 r-1fmj7o5 r-poiln3 r-b88u0q r-bcqeeo r-qvutc0"
      )[1].innerText
    );

    arr = document.getElementsByClassName(
      "css-901oao r-1fmj7o5 r-1qd0xha r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-qvutc0"
    )[1].children;

    bio = "";

    for (i = 0; i < arr.length; i++) {
      bio += arr[i].outerText;
    }
    console.log("Bio ", bio);
  };
});
