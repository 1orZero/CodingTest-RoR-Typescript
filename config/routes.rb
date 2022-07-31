# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "todo#landing"
  post "todo", to: "todo#edit_todo_item"
  post "reset", to: "todo#reset_todo_items"
  post "add", to: "todo#add_todo_item"
  post "addHistory", to: "todo#add_todo_history"
  post "del", to: "todo#del_todo_item"
  post "addCategory", to: "category#add_category_item"
  post "delCategory", to: "category#del_category_item"
  post "getHistoryByTodoId", to: "history#get_history_item_by_todo_id"
end
