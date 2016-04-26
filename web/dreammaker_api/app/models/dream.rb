class Dream < ActiveRecord::Base

  before_create :set_init

  has_many :steps, dependent: :destroy
  belongs_to :user
  has_many :rating_statuses

  validates :title, presence: true
  validates :lastDate, presence: true, date: { :after_or_equal_to => Date.today}
protected

  def set_init
    self.finished = false
    self.rate = 0
  end
  
end
