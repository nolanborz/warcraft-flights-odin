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
    if (event.target.type === 'checkbox') {
      // Checkbox logic
      if (event.target.checked) {
        this.checkboxContentTarget.classList.add('bg-yellow-200')
      } else {
        this.checkboxContentTarget.classList.remove('bg-yellow-200')
      }
    } else {
      // Button logic
      this.lightContentTarget.hidden = !this.lightContentTarget.hidden
      const buttonText = this.lightContentTarget.hidden ? "Lights on" : "Lights off"
      this.element.querySelector('button').textContent = buttonText
    }
  }
}
