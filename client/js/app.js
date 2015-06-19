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
            .state('update-user-success', {
                url: '/update-user/success',
                templateUrl: 'views/update-user-success.html'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'views/products.html',
                controller:'ProductController'
            }).state('myOrders', {
                url: '/myOrders',
                templateUrl: 'views/myOrders.html',
                controller:'OrderController',
                authenticate:true
            }).state('update-user', {
                url: '/update-user',
                templateUrl: 'views/update-user.html',
                controller:'UpdateUserController',
                authenticate:true
            }).state('error', {
                url: '/error',
                templateUrl: 'views/error.html'
            }).state('superAdmin', {
                url: '/superAdmin',
                templateUrl: 'views/admin.html',
                controller:'SuperAuthController'
            }).state('manage', {
                url: '/manage',
                templateUrl: 'views/manage.html'
            }).state('userManage', {
                url: '/userManage',
                templateUrl: 'views/userManage.html'
            }).state('productManage', {
                url: '/productManage',
                templateUrl: 'views/productManage.html',
                controller:'ProductController',
                authenticate:true
            }).state('orderManage', {
                url: '/orderManage',
                templateUrl: 'views/orderManage.html'
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