'use strict';

/**
 * @ngdoc function
 * @name ngCartAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngCartAppApp
 */
angular.module('ngCartApp')
  .controller('CartCtrl',['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
    	$scope.products = {};
    	$rootScope.user = angular.fromJson(sessionStorage.getItem("user"));
    	$rootScope.islogged = false;
    	if($rootScope.user){
    		$rootScope.islogged = true;
    	}
    	$http({
    		method: 'GET',
    		url : 'http://localhost:8080/ngCart/displayCart/'+$rootScope.user.userId,
    		 headers: {
   				'Content-Type': 'appication/json'
 				}
    	}).then(function(response){
    		console.log(response);
			$scope.products = response.data;
			for (var i = $scope.products.length - 1; i >= 0; i--) {
				$scope.products[i].productImg = "../images/"+response.data[i].productImg;
				console.log($scope.products[i].productImg);
			}
		});
  }]);
