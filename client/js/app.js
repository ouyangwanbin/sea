angular
    .module('app', [
        'ui.router',
        'lbServices',
        'ngCookies',
        'ui.bootstrap'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
        $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'AuthLoginController'
            })
            .state('logout', {
                url: '/logout',
                controller: 'AuthLogoutController',
                authenticate:true
            })
            .state('sign-up', {
                url: '/sign-up',
                templateUrl: 'views/sign-up-form.html',
                controller: 'SignUpController',
            })
            .state('sign-up-success', {
                url: '/sign-up/success',
                templateUrl: 'views/sign-up-success.html'
            })
            .state('reset-password-success', {
                url: '/reset-password/success',
                templateUrl: 'views/reset-password-success.html'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'views/products.html',
                controller:'ProductController'
            }).state('my-orders', {
                url: '/orders',
                templateUrl: 'views/my-orders.html',
                controller:'OrderController',
                authenticate:true
            }).state('reset-password', {
                url: '/reset-password',
                templateUrl: 'views/reset-password.html',
                controller:'UpdateUserController',
                authenticate:true
            }).state('error', {
                url: '/error',
                templateUrl: 'views/error.html'
            });
        $urlRouterProvider.otherwise('products');
    }])
    .run(['$rootScope', '$state', '$cookieStore' ,function($rootScope, $state , $cookieStore) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            if( $cookieStore.get( "currentUser" ) ){
                $rootScope.currentUser = $cookieStore.get( "currentUser" );
            }
            // redirect to login page if not logged in
            if (next.authenticate && !$rootScope.currentUser) {
                event.preventDefault(); //prevent current page from loading
                $state.go('products');
            }
        });
    }]);