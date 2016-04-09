class Api::V1::StepsController < ApplicationController
  respond_to :json
  before_filter :find_step, only: [:show, :update, :destroy]

  def index
    respond_with Step.all
  end

  def show
    render json: @step
  end

  def create
    @step = Step.new(step_params)
    if @step.save
      render json: @step, status: :created, location: [:api, @step]
    else
      render json: { errors: @step.errors }, status: 422
    end
  end

  def update
    @step = Step.update(step_params)
    if @step.save
      render json: @step, status: :created, location: [:api, @step]
    else
      render json: { errors: @step.errors }, status: 422
    end
  end

  def destroy
    @step.destroy
    head 204
  end

  private

    def find_step
      @step = Step.find(params[:id])
    end

    def step_param
      params.require(:data).permit(:id, attributes: [:title, :date, :description])
    end
    
end
