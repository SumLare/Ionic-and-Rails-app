require "rails_helper"

RSpec.describe Dream, type: :model do
  let(:dream) { create(:dream) }
  it { expect(dream.rate).to eq 0 }
  it { expect(dream.finished).to eq false }
  it { expect(dream).to respond_to(:title) }
  it { expect(dream).to respond_to(:lastDate) }
  it { expect(dream).to respond_to(:rate) }

  it { expect(dream).to validate_presence_of(:title) }
  it { expect(dream).to validate_presence_of(:lastDate) }
  it { expect(dream).to be_valid }

end