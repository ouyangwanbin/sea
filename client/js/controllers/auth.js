angular
    .module('app')
    .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {
            $scope.login = function() {
                AuthService.login($scope.customer.email, $scope.customer.password)
                    .then(function() {
                        $state.go('products');
                    },function(){
                        $scope.userFrom.error = { 'msg' : 'User email and password do not match.' };
                    });
            };
        }
    ])
    .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {
            AuthService.logout()
                .then(function() {
                    $state.go('products');
                });
        }
    ])
    .controller('SignUpController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {

            $scope.register = function() {
                if( $scope.customer.password != $scope.customer.confirm.password ){
                  $scope.userForm.error = { 'msg' : 'Password does not match.' } ;
                  return;
                }

                AuthService.checkExist( $scope.customer.email ).then( function( count ){
                    if( count > 0 ){
                        $scope.userForm.email.error = { 'msg' : 'The email is in use.' } ;
                        return;
                    }
                    AuthService.register($scope.customer.email, $scope.customer.password)
                    .then(function() {
                        $state.transitionTo('sign-up-success');
                    });
                });
            };
        }
    ]);