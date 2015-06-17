angular
    .module('app')
    .controller('AuthLoginController', ['$scope', 'User', '$state', '$cookieStore', '$rootScope',
        function($scope, User, $state, $cookieStore, $rootScope) {
            $scope.login = function() {
                User.login({
                    rememberMe: $scope.rememberMe
                }, {
                    email: $scope.user.email,
                    password: $scope.user.password
                }, function(response) {
                    $rootScope.currentUser = {
                        user: response.user,
                        tokenId: response.id
                    };
                    $cookieStore.put('currentUser', $rootScope.currentUser);
                    $state.go('products');
                }, function() {
                    $scope.userForm.error = {
                        'msg': 'User email and password do not match.'
                    };
                });
            }
        }
    ])
    .controller('AuthLogoutController', ['$scope', 'User', '$state', '$cookieStore', '$rootScope',
        function($scope, User, $state, $cookieStore, $rootScope) {
            User.logout(function() {
                $rootScope.currentUser = null;
                $cookieStore.remove('currentUser');
                $state.go('products');
            }, function() {
                $rootScope.currentUser = null;
                $cookieStore.remove('currentUser');
                $state.go('error');
            });
        }
    ]).controller('UpdateUserController', ['$scope', '$rootScope', 'User', '$state',
        function($scope, $rootScope, User, $state) {
            $scope.restPassword = function() {
                if ($scope.user.newPassword != $scope.user.confirmPassword) {
                    $scope.userForm.error = {
                        'msg': 'Password does not match.'
                    };
                    return;
                }
                var user = {};
                user.userId = $rootScope.currentUser.user.id;
                user.email = $rootScope.currentUser.user.email;
                user.password = $scope.user.newPassword;
                User.prototype$updateAttributes({
                    id: user.userId
                }, user, function(response) {
                    console.log(response);
                    $state.transitionTo('reset-password-success');
                }, function() {
                    $state.go("error");
                });
            }
        }
    ])
    .controller('SignUpController', ['$scope', 'User', '$state', '$cookieStore', '$rootScope',
        function($scope, User, $state, $cookieStore, $rootScope) {
            $scope.user = {};
            $scope.user.confirm = {};
            $scope.$watch(function(scope) {
                return scope.user.password;
            }, function(newValue, oldValue) {
                if (newValue !== $scope.user.confirm.password) {
                    $scope.userForm.error = {
                        'msg': 'Password does not match.'
                    };
                } else {
                    $scope.userForm.error = null;
                }

            });

            $scope.$watch(function(scope) {
                return scope.user.confirm.password;
            }, function(newValue, oldValue) {
                if (newValue !== $scope.user.password) {
                    $scope.userForm.error = {
                        'msg': 'Password does not match.'
                    };
                } else {
                    $scope.userForm.error = null;
                }
            })
            $scope.register = function() {
                // if( $scope.user.password != $scope.user.confirm.password ){
                //   $scope.userForm.error = { 'msg' : 'Password does not match.' } ;
                //   return;
                // }
                var user = {};
                user.email = $scope.user.email;
                User.count({
                    where: user
                }, function(response) {
                    if (response.count > 0) {
                        $scope.userForm.email.error = {
                            'msg': 'The email is in use.'
                        };
                        return;
                    } else {
                        user.password = $scope.user.password;
                        User.create(user, function() {
                            $state.transitionTo('sign-up-success');
                        }, function() {
                            $state.go('error');
                        });
                    }
                }, function() {
                    $state.go('error');
                });
            }
        }
    ]);
