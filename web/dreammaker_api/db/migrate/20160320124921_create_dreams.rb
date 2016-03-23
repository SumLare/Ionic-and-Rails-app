class CreateDreams < ActiveRecord::Migration
  def change
    create_table :dreams do |t|
      t.string :title
      t.date :last_date
      t.references :user, index: true
      t.timestamps null: false
    end
  end
end
