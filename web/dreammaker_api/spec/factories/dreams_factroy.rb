FactoryGirl.define do
  factory :dream do
    title "Dream title"
    lastDate DateTime.now.to_date
    rate 0
    finished false
  end

  factory :invalid_dream, class: Dream do
    title nil
    lastDate nil
    rate 0
    finished false
  end

end