class AddNameToAirports < ActiveRecord::Migration[7.2]
  def change
    add_column :airports, :name, :string
  end
end
