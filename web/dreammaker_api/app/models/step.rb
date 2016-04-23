class Step < ActiveRecord::Base

  after_initialize :set_finished

  belongs_to :user
  belongs_to :dream
  validates :title, :description, :date, presence: true

  def set_finished
    self.finished = false
  end

end

