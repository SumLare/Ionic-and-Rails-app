class Api::V1::RatingStatusesController < ApplicationController
  respond_to :json

  def index
    respond_with RatingStatus.where(dream_id: params[:dream_id])
  end

  def create
    @dream = Dream.find(params[:dream_id])
    @status = @dream.rating_statuses.build(status_params)
    if @status.save
      render json: @status, status: :created, location: [:api, @status]
    else
      render json: { errors: @status.errors }, status: 422
    end
  end

  def update
    @dream = Dream.find(params[:dream_id])
    @status = @dream.rating_statuses.find(params[:id])
    if @status.update(status_params)
      render json: @status, status: 200, location: [:api, @dream, @status]
    else
      render json: { errors: @status.errors }, status: 422
    end
  end
private

  def status_params
    params.permit(:id, attributes: [:status, :user_id, :dream_id])
  end

end
