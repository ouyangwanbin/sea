angular
    .module('app')
    .controller('ProductController', ['$scope', 'ProductService', 'OrderService', '$state', '$rootScope', '$modal',
        function($scope, ProductService, OrderService, $state, $rootScope, $modal) {
            ProductService.getAllproducts().then(function(response) {
                $scope.products = response;
            }, function() {
            	//fail to get the products data.
            });
            $scope.order = function(product) {
                if (!$rootScope.currentUser) {
                    $modal.open({
                        templateUrl: 'views/modal.html',
                        controller:'MessageModalInstanceCtrl',
                        resolve:{
                        	message : function(){
                        		return "Please login to order";;
                        	}
                        }
                    });
                    return false;
                }
                if( product.orderUnit > 0 ){
                	product.userId = $rootScope.currentUser.user.id;
					$modal.open({
                    	templateUrl: 'views/orderModal.html',
                    	controller: 'ModalInstanceCtrl',
                    	resolve: {
                        	product: function() {
                            	return product;
                        	},
                        	orderService: function(){
                        		return OrderService;
                        	}
                    	}
                	});
                }else{
                	$modal.open({
                        templateUrl: 'views/modal.html',
                        controller:'MessageModalInstanceCtrl',
                        resolve:{
                        	message : function(){
                        		return "invalid unit number";
                        	}
                        }
                    });
                    return false;
                }
            }
        }
    ]).controller('ModalInstanceCtrl',
        function($scope, $modalInstance, product , orderService) {
            debugger;
            $scope.product = product;
            $scope.confirm = function( ) {
            	var order = {};
            	order.userId = product.userId;
            	order.productName = product.productName;
            	order.unit = product.orderUnit;
                order.unitPrice = product.unitPrice;
            	order.orderDate = new Date();
            	order.orderStatus = "ordered";
            	orderService.createOrder(order);
				$modalInstance.close( );
            };

            $scope.cancel = function() {
                $modalInstance.dismiss( );
            };
    }).controller('MessageModalInstanceCtrl',
        function($scope, $modalInstance, message) {
    		$scope.message = message; 
    		$scope.close = function(){
    			$modalInstance.close( );
    		}       
    });