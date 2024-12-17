import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggler"
export default class extends Controller {
  static targets = [ "lightContent", "checkboxContent"]

  connect() {
    if (this.hasLightContentTarget) {
      this.lightContentTarget.hidden = true
    }
  }
  hideShow(event) {
    this.lightContentTarget.hidden = !this.lightContentTarget.hidden
    const buttonText = this.lightContentTarget.hidden ? "Lights on" : "Lights off"
    this.element.querySelector('button').textContent = buttonText
    
  }
}
