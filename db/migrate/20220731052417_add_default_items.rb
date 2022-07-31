class AddDefaultItems < ActiveRecord::Migration[6.1]
  def up
    @category = Category.create(name: "Default", description: "")
    @category.todos.create().history.create(content: "Click the text to edit")
    @historyDemo = @category.todos.create()
    @historyDemo.history.create(content: "History Demo")
    @historyDemo.history.create(content: "History Demo 2")
    @historyDemo.history.create(content: "History Demo 3 (latest)")
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
