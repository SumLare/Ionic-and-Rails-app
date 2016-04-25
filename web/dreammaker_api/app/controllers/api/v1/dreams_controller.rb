class Api::V1::DreamsController < ApplicationController
  respond_to :json
  #before_action :authenticate_api_user!
  before_filter :find_dream, only: [:show, :update, :destroy]
  
  def index
    respond_with Dream.all, include:  ['user']
  end

  def show
    render json: @dream
  end

  def create
    @dream = Dream.new(dream_params)
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
    params.permit(:id, :title, :lastDate, :rate, :user_id)
  end

end
