class StepSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :description, :finished
  belongs_to :dream
end
