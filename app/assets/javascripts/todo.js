
angular.module('todoApp', ['ngResource']).controller('TodoListController', function($resource) {
  var Project = $resource('/projects/:id', {id: '@id', name: '@name'},
    { update: { method: 'PUT',  params: { name: 'name' } }
  });
  
  
  var vm = this;
  vm.projects = [];
  
  Project.query(function(projects) {
    vm.projects = projects;
  })
  
  vm.inputActive = false;
  vm.inputEditActive = 0;
  
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
        return project.id != id
      });
    });
  }
  
  vm.editProject = function(project) {
    if ( vm.inputEditActive == project.id ) {
      vm.inputEditActive = 0;
    }
    else {
      vm.inputEditActive = project.id;
    }
  }

  vm.updateProject = function(text, project) {
    Project.update({
      id: project.id,
      name: text
    }, function (response) {
      if (response.status === 200) {
        vm.projects.find(function(prj) {
          if (prj.id  === project.id) {
            prj.name = text
          }
        });
        vm.inputEditActive = 0;
      }
    });
  }
  
});
