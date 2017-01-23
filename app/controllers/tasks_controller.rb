class TasksController < ApplicationController
    
    before_action :initialize_task, only: [:show, :edit, :update, :create]
    
    def index
        @tasks = Task.all
    end
    
    def new
        @task = Task.new
    end
    
    def create
        Task.create(task_params)
        redirect_to action: :index
    end
    
    def show
    end
    
    def edit
    end
    
    def update
       @task.update(task_params)
       redirect_to action: :show, id: @task.id
    end
    
    def destroy
        @task.destroy!
        redirect_to action: :index
    end
    
    private
    
    def task_params
        params.require(:task).permit(:description)
    end
   
    def initialize_task
        @task = Task.find(params[:id])
    end
end
