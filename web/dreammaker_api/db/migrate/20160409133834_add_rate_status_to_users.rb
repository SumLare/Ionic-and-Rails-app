class AddRateStatusToUsers < ActiveRecord::Migration
  def change
    add_column :users, :rate_status, :boolean
  end
end
