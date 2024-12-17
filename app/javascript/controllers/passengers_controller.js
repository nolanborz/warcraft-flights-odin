// app/javascript/controllers/passengers_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "template"]

  add(event) {
    event.preventDefault()
    const content = this.templateTarget.innerHTML.replace(/_index_/g, new Date().getTime())
    this.containerTarget.insertAdjacentHTML('beforeend', content)
  }

  remove(event) {
    event.preventDefault()
    const wrapper = event.target.closest('.border')
    if (this.containerTarget.children.length > 1) {
      wrapper.remove()
    }
  }
}