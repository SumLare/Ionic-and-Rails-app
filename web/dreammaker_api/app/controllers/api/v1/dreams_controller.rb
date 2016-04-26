class Api::V1::DreamsController < ApplicationController
  respond_to :json
  #before_action :authenticate_api_user!
  before_filter :find_dream, only: [:show, :update, :destroy]
  
  def index
    respond_with Dream.all
  end

  def show
    render json: @dream
  end

  def create
    @dream = current_user.dreams.build(dream_params)
    if @dream.save
      render json: @dream, status: :created, location: [:api, @dream]
    else
      render json: { errors: @dream.errors }, status: 422
    end
  end

  def update
    if @dream.update(dream_params)
      render json: @dream, status: 200, location: [:api, @dream]
    else
      render json: { errors: @dream.errors }, status: 422
    end
  end

  def destroy
    @dream.destroy
    head :no_content
  end


private
  
  def find_dream
    @dream = Dream.find(params[:id])
  end

  def dream_params
    params.permit(:id, :user_id, attributes: [:title, :lastDate, :finished, :rate], relationships:[])
  end

end
