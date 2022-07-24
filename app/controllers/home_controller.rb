# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :set_todo_item, only: [:edit_todo_item]
  # around_action :get_todo_items, only: [:edit_todo_item, :reset_todo_items]

  def landing
    @todos = Todo.all.order(:id)
  end

  def edit_todo_item
    @todo_item.update(todo_item_params)
    @todos = Todo.all.order(:id)
    render :json => @todos
  end

  def reset_todo_items
    Todo.update_all(checked: false)
    @todos = Todo.all.order(:id)
    render :json => @todos
  end

  private

  def get_todo_items
    @todos = Todo.all.order(:id)
    # render :json => @todos
  end

  def todo_item_params
    params.permit(:id, :title, :checked)
  end

  def set_todo_item
    @todo_item = Todo.find(todo_item_params[:id])
  end
end
