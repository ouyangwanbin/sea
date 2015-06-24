angular
    .module('app')
    .controller('UserController', ['$scope', 'User', '$state', '$cookieStore', '$rootScope','$modal',
        function($scope, User, $state, $cookieStore, $rootScope ,$modal) {
            User.find({}, function(response) {
                $scope.users = response;
            }, function(error) {
                console.log(error);
                $state.go('error');
            });
            $scope.removeUser = function(user) {
                $modal.open({
                    templateUrl: 'views/deleteUserModal.html',
                    controller: 'deleteUserModalCtrl',
                    resolve: {
                        user: function() {
                            return user;
                        },
                        User: function() {
                            return User;
                        },
                        state: function() {
                            return $state;
                        }
                    }
                });
            }
        }
    ])
    .controller('deleteUserModalCtrl', function($scope, $modalInstance, user, User, state) {
        $scope.confirm = function() {
            User.deleteById({
                id: user.id
            }, function() {
                state.go(state.current, {}, {
                    reload: true
                });
            }, function() {
                state.go('error');
            });
            $modalInstance.dismiss();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
    })