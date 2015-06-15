angular
    .module('app')
    .controller('OrderController', ['$scope', 'OrderService', '$state', '$rootScope', '$modal',
        function($scope, OrderService, $state, $rootScope, $modal) {
            if ($rootScope.currentUser) {
                OrderService.getOrdersByUserId($rootScope.currentUser.user.id).then(function(response) {
                    console.log(response);
                }, function() {
                    // fail to get data
                });
            }
        }
    ])