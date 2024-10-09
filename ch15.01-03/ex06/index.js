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
  document.querySelector("#your-OS").textContent =
    navigator.userAgentData.platform;
  document.querySelector("#your-browser").textContent =
    navigator.userAgentData.brands[0].brand;
  const opt = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const suc = (pos) => {
    const crd = pos.coords;
    document.querySelector(
      "#your-pos",
    ).textContent = `${crd.latitude} ${crd.longitude}`;
    document.querySelector(
      "#pos-link",
    ).href = `https://www.google.com/maps/search/?api=1&query=${crd.latitude},${crd.longitude}`;
  };

  const err = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  navigator.geolocation.getCurrentPosition(suc, err, opt);
});
