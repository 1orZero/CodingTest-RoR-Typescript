class RemoveTitleFromTodo < ActiveRecord::Migration[6.1]
  def change
    remove_column :todos, :title, :string
  end
end
