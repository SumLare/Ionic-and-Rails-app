class Step < ActiveRecord::Base
  belongs_to :user
  belongs_to :dream
end
