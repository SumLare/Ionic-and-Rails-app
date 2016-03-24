FactoryGirl.define do
  factory :dream do
    title "Title with 10 chars"
    last_date DateTime.now.to_date
  end
end