customElements.define("inline-circle", class InlineCircle extends HTMLElement {
  connectedCallback() {
    this.style.display = "inline-block";
    this.style.borderRadius = "50%";
    this.style.border = "solid black 1px";
    this.style.transform = "translateY(10%)";

    if (!this.style.width) {
      this.style.width = "0.8em";
      this.style.height = "0.8em";
    }
  }

  static get observedAttributes() { return ["diameter", "color", "width", "height"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case "diameter":
        this.style.width = newValue;
        this.style.height = newValue;
        break;
      case "color":
        this.style.backgroundColor = newValue;
        break;
      case "width":
        this.style.width = newValue;
        break;
      case "height":
        this.style.height = newValue;
        break;
    }
  }

  get diameter() { return this.getAttribute("diameter"); }
  set diameter(d) { this.setAttribute("diameter", d); }
  get color() { return this.getAttribute("color"); }
  set color(c) { this.setAttribute("color", c); }
  get width() { return this.getAttribute("width"); }
  set width(w) { this.setAttribute("width", w); }
  get height() { return this.getAttribute("height"); }
  set height(h) { this.setAttribute("height", h); }

});