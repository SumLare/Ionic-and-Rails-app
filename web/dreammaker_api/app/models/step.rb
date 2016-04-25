class Step < ActiveRecord::Base

  before_create :set_finished

  belongs_to :user
  belongs_to :dream
  validates :title, :description, :date, presence: true
  
protected

  def set_finished
    self.finished = false
    nil
  end

end

