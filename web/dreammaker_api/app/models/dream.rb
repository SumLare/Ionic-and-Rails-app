class Dream < ActiveRecord::Base

  before_create :set_rate

  has_many :steps, dependent: :destroy
  belongs_to :user
  has_many :rating_statuses

  validates :title, presence: true
  validates :lastDate, presence: true, date: { :after_or_equal_to => Date.today}
protected

  def set_rate
    self.rate = 0
  end
  
end
