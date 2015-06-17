angular
    .module('app')
    .controller('ProductController', ['$scope', 'Product', 'Order', '$state', '$rootScope', '$modal',
        function($scope, Product, Order, $state, $rootScope, $modal) {
            Product.find(function(response) {
                $scope.products = response;
            }, function() {
                $state.go("error");
            });

            $scope.order = function(product) {
                if (!$rootScope.currentUser) {
                    $modal.open({
                        templateUrl: 'views/modal.html',
                        controller: 'MessageModalInstanceCtrl',
                        resolve: {
                            message: function() {
                                return "Please login to order";;
                            }
                        }
                    });
                    return false;
                }
                if (product.orderUnit > 0) {
                    product.userId = $rootScope.currentUser.user.id;
                    $modal.open({
                        templateUrl: 'views/orderModal.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            product: function() {
                                return product;
                            },
                            Order: function() {
                                return Order;
                            },
                            user: function( ){
                            	return $rootScope.currentUser.user;
                            }
                        }
                    });
                } else {
                    $modal.open({
                        templateUrl: 'views/modal.html',
                        controller: 'MessageModalInstanceCtrl',
                        resolve: {
                            message: function() {
                                return "invalid unit number";
                            }
                        }
                    });
                    return false;
                }
            }
        }
    ]).controller('ModalInstanceCtrl',
        function($scope, $modalInstance, product, Order , user) {
            $scope.product = product;
            $scope.user = user;
            $scope.confirm = function() {
                var order = {};
                order.userId = product.userId;
                order.productName = product.productName;
                order.unit = product.orderUnit;
                order.unitPrice = product.unitPrice;
                order.orderDate = new Date();
                order.orderStatus = "ordered";
                order.address = $scope.user.address;
                Order.create(order, function() {
                    $modalInstance.close();
                }, function() {
                    $modalInstance.close();
                });

            };

            $scope.cancel = function() {
                $modalInstance.dismiss();
            };
        }).controller('MessageModalInstanceCtrl',
        function($scope, $modalInstance, message) {
            $scope.message = message;
            $scope.close = function() {
                $modalInstance.close();
            }
        });
