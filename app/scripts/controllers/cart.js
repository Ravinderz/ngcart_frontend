'use strict';

/**
 * @ngdoc function
 * @name ngCartAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngCartAppApp
 */
angular.module('ngCartApp')
  .controller('CartCtrl',['$scope','$http','$rootScope','$location',function ($scope,$http,$rootScope,$location) {
    	$scope.products = {};
    	$rootScope.user = angular.fromJson(sessionStorage.getItem('user'));
        $rootScope.username = $rootScope.user.firstName +' '+ $rootScope.user.lastName;
    	$rootScope.islogged = false;
        $scope.emptyCart = true;
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
            if($scope.products.length > 0){
                $scope.emptyCart = false;
            }
			for (var i = $scope.products.length - 1; i >= 0; i--) {
				$scope.products[i].productImg = '../images/'+response.data[i].productImg;
				console.log($scope.products[i].productImg);
			}
		});

        $scope.removeFromCart = function(cartItemId,key){
            $http({
            method: 'GET',
            url : 'http://localhost:8080/ngCart/removeFromCart/'+cartItemId,
             headers: {
                'Content-Type': 'appication/json'
                }
        }).then(function(response){
            console.log(response.data);
            $rootScope.cartSize--;
            $scope.products.splice(key,1)
        });
        }

		$scope.checkout = function(){
            $rootScope.cartSize = 0;
			$http({
    		method: 'GET',
    		url : 'http://localhost:8080/ngCart/checkout/'+$rootScope.user.userId,
    		 headers: {
   				'Content-Type': 'appication/json'
 				}
    	}).then(function(response){
            sessionStorage.setItem('orderId',response.data.message);
			$location.path('/orders');
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
