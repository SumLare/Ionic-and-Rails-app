class Setting < ActiveRecord::Base
  belongs_to :user

  scope :user_params, ->(user_id){ where(user_id: user_id) }
end
