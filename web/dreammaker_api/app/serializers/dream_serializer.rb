class DreamSerializer < ActiveModel::Serializer
  attributes :id, :title, :lastDate, :rate
  has_many :steps, dependent: :destroy
  belongs_to :user
end
