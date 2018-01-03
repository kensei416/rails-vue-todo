class Api::TasksController < ApplicationController
  before_action :logged_in_user, only: [:create, :update, :destroy]
  
  def index
    @tasks = Task.all
  end

  def create
    @task = Task.new(task_params)
    
    if @task.save
      render :show, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render :show, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end


    private
      
    def task_params
    params.fetch(:task, {}).permit(
        :title, :category_id, :is_done, :fav
    )
  end
end
