function tasksController($scope,$http,$location,$route,$routeParams, toastr){

	$scope.getTasks = function(){
		$http.get('/api/tasks/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.tasks = response.data;
		});
	}

	$scope.addTask = function(task){
        $http.post('/api/tasks/', task, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
		  $location.path('/tasks');
		  toastr.success('You have successfully added a new task!', 'Success');
        });
			}
			
	$scope.deleteTask = function(id){
		if(localStorage.getItem('admin') == 'true'){
		var id = id;
		$http.delete('/api/tasks/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$route.reload();
			toastr.success('You have successfully removed selected task!', 'Success');
		})}else{
			toastr.error('You do not have permission to delete!', 'PERMISSION');
		}
	}

	$scope.showTask = function(){
		var id = $routeParams.id;
		$http.get('/api/tasks/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.task = response.data;
		});
	}

	$scope.updateTask = function(){
        var id = $routeParams.id;
        $http.put('/api/tasks/'+ id , $scope.task, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/tasks');
              toastr.success('You have successfully updated task in!', 'Updated');
        });
	  };
	  
	  $scope.getDepartments = function(){
		$http.get('/api/departments/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.departments = response.data;
		});
  }
}