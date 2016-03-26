class StepSerializer < ActiveModel::Serializer
  attributes :id, :title, :date, :description, :finished
end
