# frozen_string_literal: true

class TodoController < ApplicationController
  before_action :set_todo_item, only: [:edit_todo_item, :add_todo_history, :del_todo_item]
  before_action :get_categorys, only: [:landing]
  before_action :get_todo_items, only: [:landing, :edit_todo_item, :reset_todo_items, :del_todo_item, :add_todo_item, :add_todo_history]

  def landing
  end

  def edit_todo_item
    @todo_item.update(todo_item_params)
    render :json => @todos
  end

  def reset_todo_items
    @oneCategoryTodos = @todos.where(category_id: params[:category_id])
    @oneCategoryTodos.each do |todo|
      todo.update(checked: false)
    end

    render :json => @todos
  end

  def del_todo_item
    @todo_item.destroy
    render :json => @todos
  end

  def add_todo_item
    @item = Todo.new({ category_id: todo_item_params[:category_id] })
    if @item.save
      @item.history.create(content: todo_item_params[:content])
      render :json => @todos
    else
      render :json => { success: false }
    end
  end

  def add_todo_history
    @history = @todo_item.history.create(content: todo_item_params[:content])
    if (@history.save)
      render :json => @todos
    else
      render :json => { success: false }
    end
  end

  private

  def get_categorys
    @categories = Category.all
  end

  def get_todo_items
    @todos = Todo.select("DISTINCT ON(histories.todo_id) todos.id, todos.checked, todos.created_at, todos.updated_at, todos.category_id, histories.content").joins(:history).order("histories.todo_id ASC", "histories.created_at DESC")
  end

  def todo_item_params
    params.except(:todo).permit(:id, :checked, :category_id, :content)
  end

  def set_todo_item
    @todo_item = Todo.find(todo_item_params[:id])
  end
end
