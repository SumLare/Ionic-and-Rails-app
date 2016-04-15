FactoryGirl.define do
  factory :step do
    title "First step"
    date DateTime.now.to_date
    description "Description"
    dream
  end
end