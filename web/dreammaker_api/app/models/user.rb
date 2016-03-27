class User < ActiveRecord::Base

  before_save -> do
    self.uid = SecureRandom.uuid
    skip_confirmation!
  end

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :dreams
  validates :name, presence: true
  validates :email, uniqueness: { case_sensitive: true }
end
