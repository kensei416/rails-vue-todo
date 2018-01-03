class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    if @user && @user.authenticate(params[:session][:password]) && !logged_in?
     log_in @user
     params[:session][:remember_me] == "true" ? remember(@user) : forget(@user)
     render json: { email: @user.email, id: @user.id, categories: @user.categories }
    else
      render json: { ErrorMesage: 'Invalid email/password combination' }, status: :not_found
    end
  end

  def destroy
    if log_out 
      render :show, status: :destroy
    else
      return render json: { ErrorMessage: 'Invalid logout' }
    end
  end
  
end
