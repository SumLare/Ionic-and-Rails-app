class Step < ActiveRecord::Base
  belongs_to :user
  belongs_to :dream
  validates :title, :description, :date, presence: true
end

