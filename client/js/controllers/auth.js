angular
    .module('app')
    .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {
            $scope.login = function() {
                AuthService.login($scope.customer.email, $scope.customer.password)
                    .then(function() {
                        // $state.go('add-review');
                    });
            };
        }
    ])
    .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {
            AuthService.logout()
                .then(function() {
                    $state.go('all-reviews');
                });
        }
    ])
    .controller('SignUpController', ['$scope', 'AuthService', '$state',
        function($scope, AuthService, $state) {

            $scope.register = function() {
                AuthService.register($scope.customer.email, $scope.customer.password)
                    .then(function() {
                        $state.transitionTo('sign-up-success');
                    });
            };
        }
    ]);