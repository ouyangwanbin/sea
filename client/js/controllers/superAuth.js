angular
    .module('app')
    .controller('SuperAuthController', ['$scope', 'User', '$state', '$cookieStore', '$rootScope',
        function($scope, User, $state, $cookieStore, $rootScope) {
            $rootScope.currentUser = null;
            $cookieStore.remove('currentUser');
            $scope.login = function( ) {
                if( !$scope.user.password || !$scope.user.email){
                    return;
                }

                if( $scope.user.email !== "admin@gmail.com" ){
                    return;
                }
                User.login({
                    rememberMe: $scope.rememberMe
                }, {
                    email: $scope.user.email,
                    password: $scope.user.password
                }, function(response) {
                    console.log( response );
                    $rootScope.currentUser = {
                        user: response.user,
                        tokenId: response.id
                    };
                    $cookieStore.put('currentUser', $rootScope.currentUser);
                    $state.go('manage');
                }, function() {
                    
                });
            }
        }
    ]);