class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :dreams, dependent: :destroy
  has_many :friends, through: :friendships
end
