class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.references :user, index: true
      t.boolean :friendsRating
      t.boolean :friendsViewProfile
      t.boolean :notifications
      t.timestamps null: false
    end
  end
end
