class CreateHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :histories do |t|
      t.string :content
      t.references :todo

      t.timestamps
    end
  end
end
