class Api::V1::RatingStatusesController < ApplicationController
  respond_to :json

  def index
    respond_with RatingStatus.all
  end

  def show
    @status = RatingStatus.find(params[:id])
    render json: @status
  end

  def create
    @status = RatingStatus.new(status_params)
    if @status.save
      render json: @status, status: :created, location: [:api, @status]
    else
      render json: { errors: @status.errors }, status: 422
    end
  end

  def update
    @status = RatingStatus.find(params[:id])
    if @status.update_attribute(:status, params[:attributes][:status])
      render json: @status, status: 200, location: [:api, @status]
    else
      render json: { errors: @status.errors }, status: 422
    end
  end
private

  def status_params
    params.permit(:id, attributes: [:status, :user_id, :dream_id])
  end

end
