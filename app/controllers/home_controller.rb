# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :set_todo_item, only: [:edit_todo_item, :del_todo_item]
  before_action :get_categorys, only: [:landing]
  before_action :get_todo_items, only: [:landing, :edit_todo_item, :reset_todo_items, :del_todo_item, :add_todo_item]

  # before_action :get_todo_items_by_category_id, only: [:add_todo_item,:reset_todo_items]

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
    @item = Todo.new(todo_item_params)
    if @item.save
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
    @todos = Todo.all.order(:id)
    # if params[:category_id].present?
    #   @todos = @todos.where(category_id: params[:category_id])
    # end
  end

  def todo_item_params
    params.except(:home).permit(:id,:checked, :category_id)
  end

  def set_todo_item
    @todo_item = Todo.find(todo_item_params[:id])
  end
end
