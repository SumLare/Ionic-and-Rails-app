class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email,:current_sign_in_at,
              :last_sign_in_at, :created_at
  has_many :dreams, dependent: :destroy
  has_many :friends, through: :friendships
end
