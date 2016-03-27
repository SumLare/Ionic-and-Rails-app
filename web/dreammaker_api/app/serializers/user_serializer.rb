class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :tokens,
             :current_sign_in_at, :last_sign_in_at, :created_at
  has_many :dreams, dependent: :destroy
end
