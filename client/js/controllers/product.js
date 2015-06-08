angular
    .module('app')
    .controller('ProductController', ['$scope', 'ProductService', '$state',
        function($scope, ProductService, $state) {
            $scope.products=ProductService.getAllproducts( );
        }
    ]);