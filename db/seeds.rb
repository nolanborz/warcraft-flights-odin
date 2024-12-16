# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
Airport.destroy_all

airports = [
  { code: 'PND', name: 'Pandaria Regional Airport' },
  { code: 'BAD', name: 'Badlands International' },
  { code: 'ORG', name: 'Orgrimmar Airport' },
  { code: 'STO', name: 'Stormwind International' },
  { code: 'THB', name: 'Thunder Bluff Airport' },
  { code: 'DAL', name: 'Dalaran Regional Airstrip' },
  { code: 'GNO', name: 'Gnomeregan Landing' },
  { code: 'IRO', name: 'Ironforge International' },
  { code: 'SIL', name: 'Silvermoon Regional' },
  { code: 'BOB', name: 'Booty Bay International' }
]

airports.each do |airport|
  Airport.create!(
    code: airport[:code],
    name: airport[:name]
  )
end

# Now create flights
Flight.destroy_all

# Get all airports for reference
airport_ids = Airport.pluck(:id)

# Create flights for next 30 days
30.times do |day|
  # Create 3 flights per day between random airports
  3.times do
    # Ensure departure and arrival airports are different
    departure_id, arrival_id = airport_ids.sample(2)

    # Random flight duration between 1 and 5 hours
    duration = rand(1..5).hours

    # Create flight at different times during the day
    start_time = Time.now.beginning_of_day + day.days + rand(6..20).hours

    Flight.create!(
      departure_airport_id: departure_id,
      arrival_airport_id: arrival_id,
      start_datetime: start_time,
      duration: duration
    )
  end
end

puts "Created #{Airport.count} airports"
puts "Created #{Flight.count} flights"
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
