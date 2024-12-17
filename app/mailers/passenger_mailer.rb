class PassengerMailer < ApplicationMailer
  default from: "notifications@example.com"

  def welcome_email(passenger, booking)
    @passenger = passenger
    @booking = booking
    @flight = booking.flight
    mail(
      to: @passenger.email,
      subject: "Your Flight Booking Confirmation"
    )  end
end
