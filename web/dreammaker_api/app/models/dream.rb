class Dream < ActiveRecord::Base

  after_initialize :set_rate

  has_many :steps, dependent: :destroy
  belongs_to :user
  has_many :rating_statuses


  validates :title, presence: true
  validates :lastDate, presence: true
  validates_numericality_of :rate, greater_than_or_equal_to: 0

  def set_rate
    self.rate = 0
  end
  
end
