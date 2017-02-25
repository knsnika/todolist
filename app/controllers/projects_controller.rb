class ProjectsController < ApplicationController
  before_action :initialize_project, only: [:update, :destroy]
  before_action :authenticate_user!
 
  def index
    @projects = current_user.projects
    render json: @projects, include: :tasks
  end

  def create
    @project = current_user.projects.create(project_params)
    render json: @project
  end

  def update
    if @project.update(project_params)
      render json: { status: 200 }
    else
      render json: { status: 400 }
    end
  end

  def destroy
    if @project.destroy!
      render json: { status: 200 }
    end
  end
  
  private
  
  def project_params
    params.require(:project).permit(:name)
  end
   
  def initialize_project
    @project = Project.find(params[:id])
  end
end

