class RatingStatusSerializer < ActiveModel::Serializer
  attributes :user_id, :dream_id, :status
  belongs_to :user
  belongs_to :dream
end
