require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  it { expect(user).to respond_to(:email) }
  it { expect(user).to respond_to(:name) }
  it { expect(user).to respond_to(:password) }

  it { expect(user).to validate_presence_of(:name) }
  it { expect(user).to validate_presence_of(:email)}
  it { expect(user).to validate_uniqueness_of(:email).case_insensitive }
  it { expect(user).to validate_presence_of(:password)}
  it { expect(user).to validate_confirmation_of(:password)}
  it { expect(user).to be_valid }

  it 'gets uid assigned' do
    user.save!
    expect(user).not_to be_blank
  end

  it "doesn't send confirm email" do
    expect { user.save! }.not_to change { ActionMailer::Base.deliveries.count }
  end
end