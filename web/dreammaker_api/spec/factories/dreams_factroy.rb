FactoryGirl.define do
  factory :dream do
    title "Dream title"
    last_date DateTime.now.to_date
  end
end