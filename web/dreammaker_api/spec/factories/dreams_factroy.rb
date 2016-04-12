FactoryGirl.define do
  factory :dream do
    title "Dream title"
    lastDate DateTime.now.to_date
    rate 0
  end
end