angular
    .module('app')
    .factory('OrderService', ['Order', '$q', function(Order, $q ) {
        function createOrder( order ){
            return Order.create( order ).$promise;
        }

        function getOrdersByUserId( userId ){
            debugger;
            return Order.find( {
                    where:{
                            userId:userId
                        }
                }).$promise;
        }
        
        return {
            createOrder: createOrder,
            getOrdersByUserId:getOrdersByUserId
        };
    }]);