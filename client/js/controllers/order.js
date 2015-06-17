angular
    .module('app')
    .controller('OrderController', ['$scope', 'Order', '$state', '$rootScope', '$modal', '$cookieStore',
        function($scope, Order, $state, $rootScope, $modal, $cookieStore) {
            if ($rootScope.currentUser) {
                Order.find({
                        filter: {
                            where: {
                                userId: $rootScope.currentUser.user.id
                            }
                        }
                    },
                    function(response) {
                        $scope.orders = response;
                    },
                    function() {
                        $state.go('error');
                    });
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
                        }
                    }
                });
            }

        }
    ]).controller('deleteOrderModalCtrl',
        function($scope, $modalInstance, order, Order, orders) {
            $scope.confirm = function() {
                Order.deleteById(order, function() {
                    for (var i = 0; i < orders.length; i++) {
                        if (orders[i]["id"] === order.id) {
                            orders.splice(i, 1);
                        }
                    }
                    $modalInstance.close();
                }, function() {
                    $state.go('error');
                });

            };

            $scope.cancel = function() {
                $modalInstance.dismiss();
            };
        });
