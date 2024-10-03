"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const editorFront = document.getElementById("editor-front");
  const editorBack = document.getElementById("editor-back");
  editorFront.onclick = () => {
    editorBack.focus();
  };
  editorBack.onfocus = () => {
    editorFront.style.backgroundColor = "silver";
  };
  editorBack.onblur = () => {
    editorFront.style.backgroundColor = "white";
  };
  editorBack.oninput = () => {
    editorFront.textContent = editorBack.value;
  };
});
