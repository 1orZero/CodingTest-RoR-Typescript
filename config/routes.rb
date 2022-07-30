# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "home#landing"
  post "todo", to: "home#edit_todo_item"
  post "reset", to: "home#reset_todo_items"
  post "add", to: "home#add_todo_item"
  post "del", to: "home#del_todo_item"
  post "add", to: "home#add_todo_item"
  post "addCategory", to: "category#add_category_item"
  post "delCategory", to: "category#del_category_item"
end
