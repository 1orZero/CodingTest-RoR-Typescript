class AddDefaultItems < ActiveRecord::Migration[6.1]
  def up
    @category = Category.create(name: "Default", description: "this is a default category.")
    @category.todos.create().history.create(content: "this is a default todo2.")
    @category.todos.create().history.create(content: "Purpose")
    @category.todos.create(checked: true).history.create(content: "Peace")
    @category.todos.create().history.create(content: "Motivation")
    @category.todos.create().history.create(content: "Health")

    Category.create(name: "Work", description: "work related tasks.")
  end

  def down
    History.destroy_all
    Todo.destroy_all
    Category.destroy_all
  end
end
