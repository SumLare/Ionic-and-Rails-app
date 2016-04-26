class RatingStatus < ActiveRecord::Base

  before_create :set_status

  belongs_to :user
  belongs_to :dream
  validates :user_id, :dream_id, presence: true

  protected
  def set_status
    self.status = true
  end
end
