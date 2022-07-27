class AddDefaultCategorys < ActiveRecord::Migration[6.1]
  def up
    @category = Category.create(name: "Default", description: "this is a default category.")
    @category.todos.create(title: "Purpose")
    @category.todos.create(title: "Peace", checked: true)
    @category.todos.create(title: "Motivation")
    @category.todos.create(title: "Health")

    Category.create(name: "Work", description: "work related tasks.")
  end

  def down
    Category.destroy_all
  end
end
