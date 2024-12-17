class BookingsController < ApplicationController
  def new
    @flight = Flight.find(params[:flight_id])
    @booking = Booking.new
    params[:num_passengers].to_i.times { @booking.passengers.build }
  end

  def create
    @booking = Booking.new(booking_params)

    if @booking.save
      # Send confirmation email to each passenger
      @booking.passengers.each do |passenger|
        PassengerMailer.welcome_email(passenger, @booking).deliver_later
      end

      redirect_to @booking, notice: "Booking was successfully created. Confirmation emails have been sent."
    else
      @flight = @booking.flight
      render :new
    end
  end

  def show
    @booking = Booking.find(params[:id])
  end

  private

  def booking_params
    params.require(:booking).permit(:flight_id, passengers_attributes: [ :name, :email ])
  end
end
