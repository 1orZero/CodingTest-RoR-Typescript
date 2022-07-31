class Todo < ApplicationRecord
  belongs_to :category
  has_many :history
end
