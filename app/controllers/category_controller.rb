class CategoryController < ApplicationController
  before_action :get_categorys
  before_action :set_category_item, only: [:del_category_item]

  def add_category_item
    @item = Category.new(category_item_params)
    if @item.save
      render :json => @categories
    else
      render :json => { success: false }
    end
  end

  def del_category_item
    @category_item.destroy
    render :json => @categories
  end

  private

  def get_categorys
    @categories = Category.all
  end

  def category_item_params
    params.except(:category).permit(:id, :name)
  end

  def set_category_item
    @category_item = Category.find(category_item_params[:id])
  end
end
