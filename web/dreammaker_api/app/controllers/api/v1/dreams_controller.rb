module Api::V1
  class DreamsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_filter :find_dream, only: [:show, :update, :destroy, :edit]

    def index
      @dreams = Dream.all
      render json: @dreams, include:  ['steps'] 
    end

    def new
      @dream = Dream.new
    end

    def show
      render json: @dream, include:  ['steps'] 
    end

    def create
      dream = Dream.new(dream_params)

      if dream.save
        render json: dream, status: :created
      else
        render json: { errors: dream.errors }, status: 422
      end
    end

    def edit
      
    end

    def update
      if @dream.update(dream_params)
        head :no_content
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
      params.permit(:title, :last_date)
    end

  end
end