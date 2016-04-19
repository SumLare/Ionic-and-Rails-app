class Api::V1::SettingsController < ApplicationController
  respond_to :json

  def index
    respond_with Setting.user_params(params[:user_id])
  end

  def create
    @user = User.find(params[:user_id])
    @setting = @user.settings.build(setting_params)
    if @setting.save
      render json: @setting, status: :created, location: [:api, @user, @setting]
    else
      render json: { errors: @setting.errors }, status: 422
    end
  end

  def update
    @user = User.find(params[:user_id])
    @setting = @user.settings.find(params[:id])
    if @setting.update(setting_params)
      render json: @setting, status: 200, location: [:api, @user, @setting]
    else
      render json: { errors: @setting.errors }, status: 422
    end
  end

  private

  def setting_params
    params.permit(:id, attributes: [:notifications, :friendsViewProfile, :friendsRating])
  end
end
