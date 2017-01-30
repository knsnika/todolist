class ProjectsController < ApplicationController
  
  before_action :initialize_project, only: [:show, :edit, :update, :destroy]
  
  def index
    @projects = Project.all
  end
  
  def show
    @project = Project.find(params[:id])
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.create(project_params)
    redirect_to action: :index
  end

  def edit
  end

  def update
    @project = Project.update(params[:id])
    
  end

  def destroy
    @project.destroy!
    redirect_to action: :index
  end
  
  private
  
  def project_params
        params.require(:project).permit(:name)
  end
   
    def initialize_project
        @task = Project.find(params[:id])
    end
end

