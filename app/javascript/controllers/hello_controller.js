import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  greet() {
    console.log("Don't touch me, freak", this.element)
  }
}
