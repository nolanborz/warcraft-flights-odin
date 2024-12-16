class AddCodeToAirports < ActiveRecord::Migration[7.2]
  def change
    add_column :airports, :code, :string
  end
end
