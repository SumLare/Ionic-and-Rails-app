require "rails_helper"

RSpec.describe Step, type: :model do
  let(:step) { create(:step) }
  
  it { expect(step).to respond_to(:title) }
  it { expect(step).to respond_to(:date) }
  it { expect(step).to respond_to(:description) }

  it { expect(step).to validate_presence_of(:title) }
  it { expect(step).to validate_presence_of(:date) }
  it { expect(step).to respond_to(:description) }  

  it { expect(step).to be_valid }

end