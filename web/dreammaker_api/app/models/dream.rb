class Dream < ActiveRecord::Base

  has_many :steps, dependent: :destroy
  belongs_to :user
  has_many :rating_statuses


  validates :title, presence: true
  validates :lastDate, presence: true
  validates_numericality_of :rate, greater_than_or_equal_to: 0
end
