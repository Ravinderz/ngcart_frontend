'use strict';

/**
 * @ngdoc function
 * @name ngCartAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngCartAppApp
 */
angular.module('ngCartApp')
  .controller('OrdersCtrl',['$scope','$http','$rootScope','$location',function ($scope,$http,$rootScope,$location) {
    	$scope.orders = {};
    	$rootScope.user = angular.fromJson(sessionStorage.getItem('user'));
        $rootScope.username = $rootScope.user.firstName +' '+ $rootScope.user.lastName;
        $scope.lastOrderId = sessionStorage.getItem('orderId');
        $scope.emptyOrders = true;
        if($scope.lastOrderId){
            sessionStorage.removeItem('orderId');
        }
    	$rootScope.islogged = false;
    	if($rootScope.user){
    		$rootScope.islogged = true;
    	}else{
            $location.path('/login');
        }

        if($scope.lastOrderId){
            $scope.clickedCheckout = true;
        }
    	$http({
    		method: 'GET',
    		url : 'http://localhost:8080/ngCart/displayUserOrders/'+$rootScope.user.userId,
    		 headers: {
   				'Content-Type': 'appication/json'
 				}
    	}).then(function(response){
    		console.log(response);
			$scope.orders = response.data;
            if($scope.orders.length > 0){
                $scope.emptyOrders = false;
            }
			for (var i = $scope.orders.length - 1; i >= 0; i--) {
				$scope.orders[i].productImg = '../images/'+response.data[i].productImg;
				console.log($scope.orders[i].productImg);
			}
		});

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
