class AddRateToDreams < ActiveRecord::Migration
  def change
    add_column :dreams, :rate, :integer
  end
end
