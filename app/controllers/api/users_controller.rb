class Api::UsersController < ApplicationController
  before_action :logged_in_user, only: [:destory, :update]

  def index 
    @users = User.order('updated_at DESC')
  end


  def show 
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create 
    @user = User.new(user_params)
    if @user.save
      log_in @user
      render json: { email: @user.email, id: @user.id, categories: [] }
    else
      render json: @user, status: :unprocessable_entity
    end
  end

  private 
  def user_params
    params.require(:user).permit(:email, :user_id, :password, :password_confirmation)
  end

  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_user) unless current_user?(@user)
  end

  def admin_user
    redirect_to(root_user) unless current_user.admin
  end
end
