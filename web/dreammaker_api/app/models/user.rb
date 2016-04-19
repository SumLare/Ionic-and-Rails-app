class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships
  has_many :dreams, dependent: :destroy
  has_many :rating_statuses, dependent: :destroy
  has_many :settings, dependent: :destroy
  validates :name, presence: true
  validates :email, uniqueness: { case_sensitive: true }
  after_create :set_settings
  before_save -> do
    self.uid = SecureRandom.uuid
    skip_confirmation!
  end
  
  def set_settings
    Setting.create(
      user_id: self.id,
      notifications: true,
      friendsViewProfile: false,
      friendsRating: false      
    )
  end
end
