class Dream < ActiveRecord::Base

  include DeviseTokenAuth::Concerns::User
  has_many :steps, dependent: :destroy
  belongs_to :user

  validates :title, presence: true, length: { minimum: 10 }
  validates :last_date, presence: true
end
