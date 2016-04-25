require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do

  before(:each) { headers = {"ACCEPT" => "application/json"} }
  let(:user) { create(:user) }
  let(:valid_user) { post :create, user: attributes_for(:user), format: :json }

  describe 'GET #show' do

    before(:each) do
      sign_in user
      get :show,{ id: user.id}, format: :json
    end

    it 'return hash' do 
      expect(json_resp[:data][:attributes][:email]).to eql user.email
    end

    context 'when logged in' do
      
      it { expect(response).to be_success }

      it 'have correct attributes' do 
        expect(user).to have_attributes(
          name:"FakeUser", 
          email:"example@example.com", 
          password:"12345678")  
      end

    end
  end

  describe "POST #create" do
    before { sign_in user }
    context "when is successfully created" do
      before { valid_user }
      it "renders json for the user record" do 
        attrs = attributes_for(:user)
        expect(json_resp[:data][:attributes][:email]).to eql attrs[:email]
      end

      it { expect(response.code).to eq "201" } 
    end

    context "when isn't created" do
      before(:each) do
        invalid_user_attributes = { password: "12345678",
                                     password_confirmation: "12345678" }
        post :create, { user: invalid_user_attributes }, format: :json
        expect(User.count).to eq 0
        expect(response.code).to eq "422" 
      end

      it "renders an errors json" do
        expect(json_resp).to have_key(:errors)
      end

      it "renders json errors when user couldn't be created" do
        expect(json_resp[:errors][:email]).to include "can't be blank"
      end

    end
  end

  describe 'PUT #update' do
    context "when is successfully updated" do
      before(:each) do
        patch :update, { id: user.id,
                         user: { email: "new@example.com", password:"12345678" } }, format: :json
      end

      # it "renders the json representation for the updated user" do
      #   expect(json_resp[:data][:attributes][:email]).to eql "new@example.com" 
      # end

      it { expect(response.code).to eq "200" }
    end

    context "when is not created" do
      before(:each) do
        patch :update, { id: user.id,
                         user: { email: "bademail.com" } }, format: :json
      end

      # it "renders an errors json" do
      #   expect(json_resp).to have_key(:errors)
      # end

      # it "renders the json errors on whye the user could not be created" do
      #   expect(json_resp[:errors][:email]).to include "is not an email"
      # end

      #it { expect(response.code).to eq "422" }
    end
  end

  describe 'DELETE #destroy' do
    let(:destroy_args) { delete :destroy, {id: user.id}, format: :json }
    it 'delete user' do 
      user
      expect{destroy_args}.to change(User, :count).by(-1)
    end
  end
end
