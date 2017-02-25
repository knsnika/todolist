class ProjectsController < ApplicationController
  
  before_action :initialize_project, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
 
  def index
    @projects = current_user.projects
    render json: @projects
  end
  def show
  end

  def new
    @project = Project.new
  end

  def create
    @project = current_user.projects.create(project_params)
    render json: @project
  end

  def edit
  end

  def update
    @project.update(project_params)
    redirect_to action: :show, id: @project.id
    
  end

  def destroy
    @project.destroy!
    render json: ""
  end
  
  private
  
  def project_params
        params.require(:project).permit(:name)
  end
   
    def initialize_project
        @project = Project.find(params[:id])
    end
end

