class Api::V1::UsersController < ApplicationController
  respond_to :json
  before_filter :find_user, only: [:show, :update, :destroy]
  
  def index
    @users = User.all
    render json: @users, include: ['dreams', 'friends']
  end

  def show
    render json: @user, include: ['dreams', 'friends']
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created, location: [:api, @user]
    else
      render json: { errors: @user.errors }, status: 422
    end
  end

  def update
    if @user.update(user_params)
      render json: @user, status: 200, location: [:api, @user]
    else
      render json: { errors: @user.errors }, status: 422
    end
  end

  def destroy
    @user.destroy
    head 204
  end

  private

    def find_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:data).permit(:id, attributes: [:name, :email, :password, :password_confirmation])
    end

end
