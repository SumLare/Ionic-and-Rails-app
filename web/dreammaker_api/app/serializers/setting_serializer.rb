class SettingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :friendsRating, :friendsViewProfile,
                  :notifications
  belongs_to :user
end
