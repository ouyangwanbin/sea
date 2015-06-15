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
            .state('forbidden', {
                url: '/forbidden',
                templateUrl: 'views/forbidden.html',
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'AuthLoginController'
            })
            .state('logout', {
                url: '/logout',
                controller: 'AuthLogoutController'
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
            .state('products', {
                url: '/products',
                templateUrl: 'views/products.html',
                controller:'ProductController'
            }).state('my-orders', {
                url: '/orders',
                templateUrl: 'views/my-orders.html',
                controller:'OrderController'
            });
        $urlRouterProvider.otherwise('products');
    }])
    .run(['$rootScope', '$state', function($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function(event, next) {
            // redirect to login page if not logged in
            if (next.authenticate && !$rootScope.currentUser) {
                event.preventDefault(); //prevent current page from loading
                $state.go('forbidden');
            }
        });
    }]);