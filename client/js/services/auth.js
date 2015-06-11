angular
    .module('app')
    .factory('AuthService', ['Customer', '$q', '$rootScope', function(Customer, $q,
        $rootScope) {
        function login(email, password) {
            return Customer
                .login({
                    email: email,
                    password: password
                })
                .$promise
                .then(function(response) {
                    $rootScope.currentUser = {
                        user: response.user,
                        tokenId: response.id
                    };
                });
        }

        function logout() {
            return Customer
                .logout()
                .$promise
                .then(function() {
                    $rootScope.currentUser = null;
                });
        }

        function register(email, password) {
            return Customer
                .create({
                    email: email,
                    password: password
                })
                .$promise;
        }

        function checkExist( email ) {
            return Customer
                .count({
                    where:{
                            email:email
                        }
                })
                .$promise
                .then(function( response ) {
                    return  response.count ;
                });
        }

        return {
            login: login,
            logout: logout,
            register: register,
            checkExist:checkExist
        };
    }]);