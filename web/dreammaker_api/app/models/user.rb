class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :dreams
  has_many :steps
  validates :name, :password, presence: true
  validates :email, :name, uniqueness: { case_sensitive: true }
end
