class AddForeignKeyToHistories < ActiveRecord::Migration[6.1]
  def change
    add_reference :histories, :todo, foreign_key: true
  end
end
