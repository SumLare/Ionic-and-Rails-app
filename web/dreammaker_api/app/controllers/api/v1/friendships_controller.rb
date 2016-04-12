class Api::V1::FriendshipsController < ApplicationController
  respond_to :json
    before_filter :find_friend, only: [:show, :destroy]
  def index
    respond_with Friendship.all
  end

  def show
    render json: @friendship 
  end

  def create
    @frienship = Friendship.new(friend_params)
    if @frienship.save
      render json: @frienship, status: :created
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
    @frienship = Friendship.find(params[:id])
  end

  def friend_params
    params.permit(:id, :user_id, :friend_id)
  end

end

