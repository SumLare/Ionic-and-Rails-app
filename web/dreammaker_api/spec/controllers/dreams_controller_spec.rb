require 'rails_helper'

RSpec.describe Api::V1::DreamsController, type: :controller do
  before(:each) { request.headers['Accept'] = "application/json" }
  let(:dream) { create(:dream) }
  let(:user) { create(:user) }

  describe 'GET #show' do
    before(:example) do
      sign_in user
      get :show, id: dream.id, format: :json
    end
    context 'when logged in' do
      it 'return right data' do
        expect(json_resp[:data][:attributes][:title]).to eq(dream.title)
      end
    
      it { expect(response).to be_success }

      it 'have correct attributes' do
        expect(dream).to have_attributes(title:"Dream title", lastDate: DateTime.now)
      end
    end

    context 'when' do
      
    end
  end

  describe 'POST #create' do
    
  end

  describe 'PUT #update' do
    
  end

  describe 'DELETE #destroy' do
    before (:each) do
      delete :dream, {id: dream.id}, format: :json
    end
    it { expect(Dream.count).to eq 0 }
  end
end
