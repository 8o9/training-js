"use strict";

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://ipinfo.io/json")
    .then((response) => response.json())
    .then((data) => {
      const ipAddr = data.ip;
      document.getElementById("ip-address").textContent = ipAddr;
      document.getElementById("ip-link").href = "https://ipinfo.io/" + ipAddr;
    })
    .catch((error) => console.error("Error fetching IP info ", error));
});
