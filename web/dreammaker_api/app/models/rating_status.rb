class RatingStatus < ActiveRecord::Base
  belongs_to :user
  belongs_to :dream
  validates :user_id, :dream_id, presence: true
end
