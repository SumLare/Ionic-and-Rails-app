class Dream < ActiveRecord::Base

  has_many :steps, dependent: :destroy
  belongs_to :user

  validates :title, presence: true
  validates :last_date, presence: true
end
