FactoryGirl.define do
  factory :user do
    name "FakeUser"
    email "example@example.com"
    password "12345678"
    password_confirmation "12345678"
  end
end