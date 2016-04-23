class Api::V1::FriendshipsController < ApplicationController
  respond_to :json
    before_filter :find_friend, only: [:show, :destroy]
  def index
    respond_with Friendship.where(user_id: params[:user_id])
  end

  def show
    render json: @friendship 
  end

  def create
    @user = User.find(params[:user_id])
    @friendship = @user.friendships.build(friend_params)
    if @friendship.save
      render json: @friendship, status: :created, location: [:api, @user, @friendship]
    else
      render json: { errors: @friendship.errors }, status: 422
    end
  end

  def destroy
    @friendship.destroy
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

