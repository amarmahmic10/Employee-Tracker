function seminarsController($scope,$http,$location,$route,$routeParams, toastr){

	$scope.getSeminars = function(){
        $http.get('/api/seminars/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.seminars = response.data;
        });
      }


	$scope.addSeminar = function(seminar){
        $http.post('/api/seminars', seminar, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/seminars');
          toastr.success('You have successfully added new seminar!', 'Success');
        });
      }
			
	  $scope.showSeminar = function(){
        var id = $routeParams.id;
        $http.get('/api/seminars/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.seminar = response.data;
        });
	  }
	  
	  $scope.deleteSeminar = function(id){
        if(localStorage.getItem('admin') == 'true'){
        var id = id;
        $http.delete('/api/seminars/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $route.reload();
          toastr.success('You have successfully removed selected seminar!', 'Success');
        })}else{
          toastr.error('You do not have permission to delete!', 'PERMISSION');
        }
      }

      $scope.updateSeminar = function(){
        var id = $routeParams.id;
        $http.put('/api/seminars/'+ id , $scope.seminar, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/seminars');
              toastr.success('You have successfully updated seminar in!', 'Updated');
        });
      };
}