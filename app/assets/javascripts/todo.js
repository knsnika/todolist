
angular.module('todoApp', ['ngResource']).controller('TodoListController', function($resource) {
  var Project = $resource('/projects/:id', {id: '@id', name: '@name'},
    { 
      update: { method: 'PUT',  params: { name: 'name' } }
    }
  );
  
  var Task = $resource('/projects/:project_id/tasks/:id', {id: '@id', project_id: '@project_id', description: '@description'});
  var Tasks = $resource('/tasks/:id', {id: '@id', description: '@description', completed: '@completed'}, 
    {
      update: { method: 'PUT', params: { description: 'description', completed: 'completed' } }
    }
  );
  
  var vm = this;
  vm.projects = [];
  
  vm.inputActive = false;
  vm.inputEditActive = 0;
  vm.inputEditTask = 0;
  
  Project.query(function(projects) {
    vm.projects = projects;
  });
  
  
  vm.addProject = function() {
    if (vm.inputActive) {
      var project = new Project({name: vm.input});
      project.$save();
      vm.projects.push(project);
      vm.inputActive = false;
      vm.input = '';
    }
    else {
      vm.inputActive = true;
    }
  };
  
  vm.deleteProject = function(id) {
    Project.delete({id: id}, function() {
      vm.projects = vm.projects.filter(function(project){
        return project.id != id;
      });
    });
  };
  
  vm.editProject = function(project) {
    if ( vm.inputEditActive == project.id ) {
      vm.inputEditActive = 0;
    }
    else {
      vm.inputEditActive = project.id;
    }
  };

  vm.updateProject = function(text, project) {
    Project.update({
      id: project.id,
      name: text
    }, function (response) {
      if (response.status === 200) {
        vm.projects.find(function(prj) {
          if (prj.id  === project.id) {
            prj.name = text;
          }
        });
        vm.inputEditActive = 0;
      }
    });
  };
  
  vm.createTask = function (project) {
    var task = new Task({
      project_id: project.id,
      description: project.newTask
    });
    project.newTask = '';
    task.$save(function (response) {
      project.tasks.push(response.toJSON());
    });
  };
  
  vm.deleteTask = function (project_id, task) {
    Tasks.delete({
      id: task.id
    }, function (response) {
      vm.projects.find(function(prj) {
        if (prj.id === project_id) {
          prj.tasks = prj.tasks.filter(function(current_task) {
            return current_task.id != task.id;
          });
        }
      });
    });
  };
  
  vm.editTask = function(task_id) {
    vm.inputEditTask = task_id;
  };
  
  vm.updateTask = function (project_id, task_id) {
    Tasks.update({
      id: task_id,
      description: vm.newTaskDescription
    }, function(response) {
      vm.projects.find(function(prj) {
        if (prj.id === project_id) {
          prj.tasks = prj.tasks.filter(function(current_task) {
            if (current_task.id === task_id) {
              current_task.description = vm.newTaskDescription;
              vm.newTaskDescription = '';
              vm.inputEditTask = 0;
            }
            return true;
          });
        }
      });
    });
  };
  
  vm.toggleComplete = function(task) {
    Tasks.update({
      id: task.id,
      completed: task.completed
    });
  };
  
  
});
