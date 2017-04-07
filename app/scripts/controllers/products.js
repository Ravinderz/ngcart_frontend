'use strict';

/**
 * @ngdoc function
 * @name ngCartAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngCartAppApp
 */
angular.module('ngCartApp')
  .controller('ProductsCtrl',['$scope','$http','$rootScope','$location',function ($scope,$http,$rootScope,$location) {
    	$scope.products = {};
    	$rootScope.cartSize = '';
    	$scope.clickedAddToCart = false;
    	$rootScope.user = angular.fromJson(sessionStorage.getItem('user'));
    	$rootScope.username = $rootScope.user.firstName +' '+ $rootScope.user.lastName;
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
				$scope.products[i].productImg = '../images/'+response.data[i].productImg;
				console.log($scope.products[i].productImg);
			}
			$scope.chunkedData = chunk($scope.products, 3);
		});

		function chunk(arr, size) {
  			var newArr = [];
 			 for (var i=0; i<arr.length; i+=size) {
  				  newArr.push(arr.slice(i, i+size));
  				}
 			 return newArr;
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
        $rootScope.cartSize = $scope.products.length;
        
		});

		$scope.addToCart = function(product){
			console.log(product);
			
			$scope.clickedAddToCart =true;

			$http({
				method : 'POST',
				url:'http://localhost:8080/ngCart/addToCart/'+$rootScope.user.userId,
 				data : product
			}).then(function(response){
				$rootScope.cartSize++;
				console.log('THe product has been added to cart');
				console.log(response);
			});
		};

		 $rootScope.logout = function(e){
            console.log('inside logout function');
            e.preventDefault();
            if(sessionStorage.getItem('user')){
                sessionStorage.removeItem('user');
                $rootScope.islogged = false;
                $location.path('/');
            }
        };
  }]);
