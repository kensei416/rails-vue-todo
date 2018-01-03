class Task < ApplicationRecord
  belongs_to :category, -> { includes :user }
  validates :category_id, presence: true
  validates :title, presence: true, length: { maximum: 30 }
end
