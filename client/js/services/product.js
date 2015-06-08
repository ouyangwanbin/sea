angular
    .module('app')
    .factory('ProductService', ['Product', '$q', '$rootScope', function(Product, $q,
        $rootScope) {
        function getAllproducts( ) {
            return Product
                .find();
        }
        return {
            getAllproducts: getAllproducts
        };
    }]);