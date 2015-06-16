angular
    .module('app')
    .factory('OrderService', ['Order', '$q',  function(Order, $q ) {
        function createOrder( order ){
            return Order.create( order ).$promise;
        }

        function getOrdersByUserId( userId ){
            return Order.find({filter:{
                    where:{
                            userId:userId
                        }
                    }
            }).$promise;
        }

        function removeOrderById ( order ){
            return Order.deleteById( order ).$promise;
        }
        
        return {
            createOrder: createOrder,
            getOrdersByUserId:getOrdersByUserId,
            removeOrderById:removeOrderById
        };
    }]);