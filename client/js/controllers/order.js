angular
    .module('app')
    .controller('OrderController', ['$scope', 'User', 'Order', 'Product', '$state', '$rootScope', '$modal', '$cookieStore',
        function($scope, User, Order, Product, $state, $rootScope, $modal, $cookieStore) {
            if ($rootScope.currentUser) {
                if ($rootScope.currentUser.user.email === 'admin@gmail.com') {
                    Order.find(
                        function(response) {
                            $scope.orders = response;
                            $scope.totalSum = 0;

                            for (var i = 0; i < $scope.orders.length; i++) {
                                var order = $scope.orders[i];
                                if (order.orderStatus === 'ordered') {
                                    $scope.totalSum += order.unit * order.unitPrice;
                                }
                            }
                        },
                        function() {
                            $state.go('error');
                        });
                } else {
                    User.orders({
                            id: $rootScope.currentUser.user.id,
                        }, function(response) {
                            $scope.orders = response;
                            $scope.totalSum = 0;

                            for (var i = 0; i < $scope.orders.length; i++) {
                                var order = $scope.orders[i];
                                if (order.orderStatus === 'ordered') {
                                    $scope.totalSum += order.unit * order.unitPrice;
                                }
                            }
                        },
                        function() {
                            $state.go('error');
                        });
                }

            } else {
                $state.go('products');
            }
            $scope.removeOrder = function(order) {
                $modal.open({
                    templateUrl: 'views/deleteOrderModal.html',
                    controller: 'deleteOrderModalCtrl',
                    resolve: {
                        order: function() {
                            return order;
                        },
                        Order: function() {
                            return Order;
                        },
                        orders: function() {
                            return $scope.orders;
                        },
                        state: function() {
                            return $state;
                        },
                        Product: function() {
                            return Product;
                        },
                        User: function() {
                            return User;
                        }
                    }
                });
            }

            $scope.changeSelectValue = function(order) {
                Order.prototype$updateAttributes({
                    id: order.id
                }, { orderStatus : order.orderStatus}, function() {
                    console.log('update success');
                    $state.go($state.current, {}, {
                        reload: true
                    });
                }, function() {
                    $state.go('error');
                })
            }
        }
    ]).controller('deleteOrderModalCtrl',
        function($scope, $modalInstance, order, Order, orders, state, Product, User) {
            $scope.confirm = function() {
                User.orders.destroyById({
                    id: order.userId,
                    fk: order.id
                }, function() {
                    Product.findById({
                        id: order.productId
                    }, function(response) {
                        var p = response;
                        p.quantities = p.quantities + order.unit;
                        Product.prototype$updateAttributes({
                            id: p.id
                        }, {
                            quantities: p.quantities
                        }, function() {
                            state.go(state.current, {}, {
                                reload: true
                            });
                        }, function() {
                            state.go('error');
                        })
                    }, function() {
                        state.go('error');
                    })
                    $modalInstance.close();
                },function(){
                    state.go('error');
                });
            };

            $scope.cancel = function() {
                $modalInstance.dismiss();
            };
        });
