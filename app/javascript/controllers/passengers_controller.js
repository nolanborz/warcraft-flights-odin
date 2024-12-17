// app/javascript/controllers/passengers_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["fields", "template", "addButton", "numberLabel"]
  static values = {
    maxPassengers: { type: Number, default: 6 }
  }

  connect() {
    console.log("Connected!", this.numberLabelTargets.length) // Debug
    this.updateAddButtonVisibility()
    this.updatePassengerNumbers()
  }

  add(event) {
    event.preventDefault()
    
    if (this.fieldsTargets.length >= this.maxPassengersValue) {
      return
    }
    
    // Create a new passenger form with the correct index
    const newIndex = this.fieldsTargets.length
    console.log("Adding passenger with index:", newIndex + 1) // Debug
    
    // Clone the template content
    const template = this.templateTarget.content.cloneNode(true)
    
    // Update the form index
    const timestamp = new Date().getTime()
    template.querySelector('[data-passengers-target="fields"]').innerHTML = 
      template.querySelector('[data-passengers-target="fields"]').innerHTML.replace(/_index_/g, timestamp)
    
    // Add to the form
    this.fieldsTarget.appendChild(template)
    
    // Update UI
    this.updateAddButtonVisibility()
    this.updatePassengerNumbers()
  }

  remove(event) {
    event.preventDefault()
    const wrapper = event.target.closest("[data-passengers-target='fields']")
    
    if (wrapper && this.fieldsTargets.length > 1) {
      wrapper.remove()
      this.updateAddButtonVisibility()
      this.updatePassengerNumbers()
    }
  }

  updateAddButtonVisibility() {
    if (this.hasAddButtonTarget) {
      this.addButtonTarget.style.display = 
        this.fieldsTargets.length >= this.maxPassengersValue ? "none" : "block"
    }
  }

  updatePassengerNumbers() {
    console.log("Updating numbers, total fields:", this.numberLabelTargets.length) // Debug
    this.numberLabelTargets.forEach((label, index) => {
      label.textContent = `Passenger ${index + 1}`
      console.log("Updated label to:", `Passenger ${index + 1}`) // Debug
    })
  }
}