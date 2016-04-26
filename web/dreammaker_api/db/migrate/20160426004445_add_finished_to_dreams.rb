class AddFinishedToDreams < ActiveRecord::Migration
  def change
    add_column :dreams, :finished, :boolean
  end
end
