class ApplicationController < ActionController::Base
  include SessionsHelper

  private

  def logged_in_user
    unless logged_in?
      render json: "Please login!", status: :unprocessable_entity
    end
  end
end
