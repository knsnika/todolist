class TasksController < ApplicationController
  before_action :initialize_task, only: [:show, :edit, :update, :destroy, :complete]
  before_action :initialize_project, only: [:index, :create, :new]

  def create
    task = @project.tasks.create(task_params)
    render json: task
  end

  def update
    @task.update(task_params)
    redirect_to action: :show, id: @task.id
  end

  def destroy
    @task.destroy!
    redirect_to action: :index
  end

  def complete
    @task.update(completed: !@task.completed)
    redirect_to action: :index, project_id: @task.project_id
  end

  private

  def task_params
    params.require(:task).permit(:description)
  end

  def initialize_task
    @task = Task.find(params[:id])
  end
  
  def initialize_project
    @project = Project.find(params[:project_id])
  end
end
