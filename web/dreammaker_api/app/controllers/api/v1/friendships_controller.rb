class Api::V1::FriendshipsController < ApplicationController
  respond_to :json
  def create
    @frienship = Friendship.new(params[:frienship])
    if @frienship.save
      render json: @frienship, status: :created
    else
      render json: { errors: @frienship.errors }, status: 422
    end
  end

  def destroy
    @frienship = Friendship.find(params[:id])
    @frienship.destroy
    head 204
  end
end
