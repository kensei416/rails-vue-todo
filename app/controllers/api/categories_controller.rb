class Api::CategoriesController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy, :update]
  before_action :correct_user, only: :destroy
  def create
    @category = current_user.categories.build(title: params[:title],  user_id: params[:user_id])
    if @category.save
      render :show, status: :created
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if !@category.fixed 
      @category.destroy
    end
  end

  private

    def correct_user
      @category = current_user.categories.find_by(id: params[:id])
      redirect_to root_url if @category.nil?
    end
end
