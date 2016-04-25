require 'rails_helper'

RSpec.describe Api::V1::DreamsController, type: :controller do
  before(:each) { request.headers['Accept'] = "application/json" }
  let(:dream) { create(:dream) }
  let(:invalid_dream) do
    post :create, dream: attributes_for(:invalid_dream)
  end
  let(:user) { create(:user) }
  let(:dream_valid) { post :create, dream: attributes_for(:dream, user_id: user), format: :json }

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
  end

  describe "POST #create" do
    before { sign_in user }
    context "with valide attributes" do
      it "save a new Dream in the database" do
        dream_valid
        expect { dream_valid }.to change(Dream, :count).by(1)
      end
    end

    context "with invalid attributes" do
      before { invalid_dream }
      it "dont save a new Dream in the database" do
        expect(response.code).to eq "422" 
      end

      it "renders an errors json" do
        expect(json_resp).to have_key(:errors)
      end

      it "renders json errors when user couldn't be created" do
        expect(json_resp[:errors][:title]).to include "can't be blank"
        expect(json_resp[:errors][:lastDate]).to include "can't be blank"
      end
    end

  end

  describe 'PUT #update' do
    before { sign_in user }
    context "with valide attributes" do
      it "assigns requested dream to @dream" do
        patch :update, id: dream, dream: attributes_for(:dream)
        expect(assigns(:dream)).to eq dream
      end

      it "chenges dream attributes" do
        title = dream.title
        chenge_attr = { title: "Another title" }
        patch :update, id: dream, dream: chenge_attr

        dream.reload
        expect(dream.title).to eq title
      end
    end

    context "with invalid attributes" do
      it "does not chenges dream attributes" do
        patch :update, id: dream, dream: { title: nil }
        dream.reload
        expect(dream.title).to_not eq nil
      end
    end
  end

  describe 'DELETE #destroy' do
    let(:destroy_args) { delete :destroy, {id: dream.id}, format: :json }
    it 'delete dream' do 
      dream
      expect{destroy_args}.to change(Dream, :count).by(-1)
    end

  end
end
