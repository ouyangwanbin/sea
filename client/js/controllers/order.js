angular
    .module('app')
    .controller('OrderController', ['$scope', 'OrderService', '$state', '$rootScope', '$modal', '$cookieStore' ,
        function($scope, OrderService, $state, $rootScope, $modal , $cookieStore) {
            if( $cookieStore.get( 'currentUser' ) ){
                $rootScope.currentUser = $cookieStore.get( 'currentUser' );
            }
            if ($rootScope.currentUser) {
                OrderService.getOrdersByUserId($rootScope.currentUser.user.id).then(function(response) {
                    $scope.orders = response;
                    
                }, function() {
                    // fail to get data
                    $state.go('products');
                });
            }else{
                 $state.go('products');
            }

            $scope.removeOrder = function ( order ){

                    $modal.open({
                        templateUrl: 'views/deleteOrderModal.html',
                        controller: 'deleteOrderModalCtrl',
                        resolve: {
                            order: function() {
                                return order;
                            },
                            orderService: function(){
                                return OrderService;
                            },
                            orders:function(){
                                return $scope.orders;
                            }
                        }
                });
            }
        }
    ]).controller('deleteOrderModalCtrl',
        function($scope, $modalInstance, order , orderService , orders ) {
            $scope.confirm = function( ) {
                orderService.removeOrderById(order);
                for( var i=0 ; i < orders.length ; i++ ){
                    if( orders[i]["id"] === order.id ){
                        orders.splice( i, 1 );
                    }
                }
                $modalInstance.close( );
            };

            $scope.cancel = function() {
                $modalInstance.dismiss( );
            };
    });