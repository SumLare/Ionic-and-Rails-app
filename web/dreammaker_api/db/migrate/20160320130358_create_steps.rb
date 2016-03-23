class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.string :title
      t.date :date
      t.text :description
      t.boolean :finished
      t.references :user, index: true
      t.references :dream, index: true
      t.timestamps null: false
    end
  end
end
