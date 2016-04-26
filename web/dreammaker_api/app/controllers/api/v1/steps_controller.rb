class Api::V1::StepsController < ApplicationController
  respond_to :json
  before_filter :find_step, only: [:show, :destroy]
  before_filter :find_dream, only: [:create, :update]

  def index
    @steps =  Step.where(dream_id: params[:dream_id])
    render json: @steps
  end

  def show
    render json: @step
  end

  def create
    @step = @dream.steps.build(step_params)
    if @step.save
      render json: @step, status: :created, location: [:api, @dream, @step]
    else
      render json: { errors: @step.errors }, status: 422
    end
  end

  def update
    @step = @dream.steps.find(params[:id])
    if @step.update(step_params)
      render json: @step, status: 200, location: [:api, @dream, @step]
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

    def find_dream
      @dream = Dream.find(params[:dream_id])
    end

    def step_params
      #ActiveModelSerializers::Deserialization.jsonapi_parse!(params)
      params.permit(:id, :dream_id, attributes: [:title, :date, :description, :finished], relationships:[])
    end
    
end
