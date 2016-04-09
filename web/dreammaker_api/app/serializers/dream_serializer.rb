class DreamSerializer < ActiveModel::Serializer
  attributes :id, :title, :last_date, :rate
  has_many :steps, dependent: :destroy
  belongs_to :user
end
