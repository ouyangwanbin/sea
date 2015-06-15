angular
    .module('app')
    .factory('ProductService', ['Product', '$q', '$rootScope','$cookieStore',function(Product, $q,
        $rootScope,$cookieStore ) {
        function getAllproducts( ) {
            if( $cookieStore.get( 'currentUser' ) ){
                $rootScope.currentUser = $cookieStore.get( 'currentUser' );
            }
            return Product.find( ).$promise;
        }
        return {
            getAllproducts: getAllproducts
        };
    }]);