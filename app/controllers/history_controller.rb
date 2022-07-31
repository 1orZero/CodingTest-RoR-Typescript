class HistoryController < ApplicationController
  def get_history_item_by_todo_id
    render :json => History.where({ todo_id: history_item_params[:todo_id] })
  end

  private

  def history_item_params
    params.except(:history).permit(:id, :todo_id)
  end
end
