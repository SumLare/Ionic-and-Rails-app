class CreateRatingStatuses < ActiveRecord::Migration
  def change
    create_table :rating_statuses do |t|
      t.references :user, index: true
      t.references :dream, index: true
      t.boolean :status
      t.timestamps null: false
    end
  end
end
