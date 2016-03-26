require 'rails_helper'

RSpec.describe Api::V1::DreamsController, type: :controller do
  before(:each) { request.headers['Accept'] = "application/vnd.dreammaker_api.v1" }
  describe 'GET #show' do
    before(:each) do
      @dream = create(:dream)
      get :show, id: @user.id, format: :json
    end

  end

  describe 'POST #create' do
    
  end
end
