class TasksController < ApplicationController
  before_action :initialize_task, only: [:show, :edit, :update, :destroy, :complete]
  before_action :initialize_project, only: [:index, :create, :new]

  def create
    task = @project.tasks.create(task_params)
    render json: task
  end

  def update
    if @task.update(task_params)
      render json: { status: 200 }
    else
      render json: { status: 400 }
    end
  end

  def destroy
    @task.destroy!
    render json: { status: 200 }
  end

  private

  def task_params
    params.require(:task).permit(:description, :completed)
  end

  def initialize_task
    @task = Task.find(params[:id])
  end
  
  def initialize_project
    @project = Project.find(params[:project_id])
  end
end
