class DreamSerializer < ActiveModel::Serializer
  attributes :id, :title, :last_date
  has_many :steps
end
