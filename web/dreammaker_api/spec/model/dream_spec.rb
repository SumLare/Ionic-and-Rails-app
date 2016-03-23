require "rails_helper"

RSpec.describe Dream, type: :model do
  let(:dream) { create(:dream) }
  
  it { expect(dream).to respond_to(:title) }
  it { expect(dream).to respond_to(:last_date) }

  it { expect(dream).to validate_presence_of (:title) }
  it { expect(dream).to validate_presence_of (:last_date) }
  it { expect(dream).to be_valid }

end