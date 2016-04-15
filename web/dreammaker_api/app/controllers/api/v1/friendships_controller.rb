class Api::V1::FriendshipsController < ApplicationController
  respond_to :json
    before_filter :find_friend, only: [:show, :destroy]
  def index
    respond_with User.find(params[:user_id]).friends
  end

  def show
    render json: @friendship 
  end

  def create
    @user = User.find(params[:user_id])
    @frienship = @user.friendships.build(friend_params)
    if @frienship.save
      render json: @frienship, status: :created, location: [:api, @user, @frienship]
    else
      render json: { errors: @frienship.errors }, status: 422
    end
  end

  def destroy
    @frienship.destroy
    head 204
  end
private
  
  def find_friend
    @user = User.find(params[:user_id])
    @friendship = @user.friendships.find(params[:id])
  end

  def friend_params
    params.permit(:id, :user_id, :friend_id)
  end

end

