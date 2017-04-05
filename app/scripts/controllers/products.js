'use strict';

/**
 * @ngdoc function
 * @name ngCartAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngCartAppApp
 */
angular.module('ngCartApp')
  .controller('ProductsCtrl',['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
    	$scope.products = {};
    	$rootScope.user = angular.fromJson(sessionStorage.getItem("user"));
    	$rootScope.islogged = false;
    	if($rootScope.user){
    		$rootScope.islogged = true;
    	}
    	$http({
    		method: 'GET',
    		url : 'http://localhost:8080/ngCart/getAllProducts',
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

		$scope.addToCart = function(product){
			console.log(product);
			

			$http({
				method : 'POST',
				url:'http://localhost:8080/ngCart/addToCart/'+$rootScope.user.userId,
 				data : product
			}).then(function(response){
				console.log("THe product has been added to cart");
				console.log(response);
			});
		}
  }]);