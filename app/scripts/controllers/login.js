'use strict';

/**
 * @ngdoc function
 * @name ngCartApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngCartApp
 */
angular.module('ngCartApp')
  .controller('LoginCtrl',['$scope','$http','$location',function ($scope,$http,$location) {
    	$scope.user = {};
      $scope.registerMsg = '';
    	$scope.login = function(){
    		$http({
  				method: 'POST',
  				url: 'http://localhost:8080/ngCart/login',
 				  data:angular.toJson($scope.user)
  			}).then(function(response){
  				console.log(response.data);
  				$scope.user = response.data;
  				sessionStorage.setItem('user', angular.toJson($scope.user));
  				$location.path('/products');
  			});
    	};
  }]).controller('RegisterCtrl',['$scope','$http',function($scope,$http){
  		$scope.user = {};

  		$scope.register = function(){
  			console.log(angular.toJson($scope.user));
  			$http({
  				method: 'POST',
  				url: 'http://localhost:8080/ngCart/register',
 				data:angular.toJson($scope.user)
  			}).then(function(response){
  				console.log(response);
          $scope.registerMsg = response.data.message;
  			});
  		};

  }]);
