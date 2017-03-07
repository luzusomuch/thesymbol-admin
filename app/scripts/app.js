'use strict';

/**
 * @ngdoc overview
 * @name eCommerceAdminApp
 * @description
 * # eCommerceAdminApp
 *
 * Main module of the application.
 */
angular
  .module('eCommerceAdminApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload',
    'angular-growl',
    'ui.select'
  ])
  .constant({
    // production mode
    // 'endpoint': "http://104.236.48.110:3000/api/v1"

    // testing mode
    // 'endpoint': "http://192.241.154.223:3000/api/v1"

    // our ecommercemarketplace server
    'endpoint': 'http://159.203.64.172:3000/api/v1',

    // romaios.com server
    // 'endpoint': 'http://45.55.205.112:3000/api/v1',    

    // dev mode
    // 'endpoint': "http://localhost:3000/api/v1"
  })
  .config(function($locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
  })
  .config(function(growlProvider) {
    growlProvider.globalTimeToLive(3000);
    growlProvider.globalDisableCountDown(true);
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        requireAuth: true
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about',
        requireAuth: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'LC'
      })
      .when('/product', {
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl',
        controllerAs: 'ProdC',
        requireAuth: true
      })
      .when('/product/:id', {
        templateUrl: 'views/product-edit.html',
        controller: 'ProductEditCtrl',
        controllerAs: 'ProdEdit',
        requireAuth: true
      })
      .when('/product/view/:id', {
        templateUrl: 'views/product-view.html',
        controller: 'ProductViewCtrl',
        controllerAs: 'ProdView',
        requireAuth: true
      })
      .when('/pages', {
        templateUrl: 'views/pages.html',
        controller: 'PagesCtrl',
        controllerAs: 'PagesCtrl',
        requireAuth: true
      })
      .when('/pages/:id', {
        templateUrl: 'views/pages-edit.html',
        controller: 'PagesEditCtrl',
        controllerAs: 'PagesEdit',
        requireAuth: true
      })
      .when('/add-pages', {
        templateUrl: 'views/pages-edit.html',
        controller: 'PagesAddCtrl',
        controllerAs: 'PagesEdit',
        requireAuth: true
      })
      .when('/emailtemplates', {
        templateUrl: 'views/emailtemplates.html',
        controller: 'EmailtemplatesCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/emailtemplates/:id', {
        templateUrl: 'views/emailtemplates-edit.html',
        controller: 'EmailtemplatesEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-emailtemplates', {
        templateUrl: 'views/emailtemplates-edit.html',
        controller: 'EmailtemplatesAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/categories/:id', {
        templateUrl: 'views/categories-edit.html',
        controller: 'CategoriesEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/edit-sub-categories/:id', {
        templateUrl: 'views/sub-categories-edit.html',
        controller: 'CategoriesEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-categories', {
        templateUrl: 'views/categories-edit.html',
        controller: 'CategoriesAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-sub-categories', {
        templateUrl: 'views/sub-categories-edit.html',
        controller: 'CategoriesAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/add-users', {
        templateUrl: 'views/users-edit.html',
        controller: 'UsersAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/users/:id', {
        templateUrl: 'views/users-edit.html',
        controller: 'UsersEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/profile/:id', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/change-password', {
        templateUrl: 'views/change-password.html',
        controller: 'ChangePasswordCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/configuration', {
        templateUrl: 'views/site-configuration.html',
        controller: 'SiteConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/settings/main-banner', {
        templateUrl: 'views/main-banner.html',
        controller: 'HomePageConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/settings/sub-banner', {
        templateUrl: 'views/sub-banner.html',
        controller: 'HomePageConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/settings/home-page-images', {
        templateUrl: 'views/home-page-images.html',
        controller: 'HomePageConfigurationCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/finance', {
        templateUrl: 'views/finance.html',
        controller: 'FinanceCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/finance/:id', {
        templateUrl: 'views/finance-single.html',
        controller: 'FinanceSingleCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })

      .when('/coupon', {
        templateUrl: 'views/coupon.html',
        controller: 'CouponAddCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/coupon_list', {
        templateUrl: 'views/coupon_list.html',
        controller: 'CouponCtrl',
        controllerAs: 'Ctrl'
      })
      .when('/coupons/:id', {
        templateUrl: 'views/coupon.html',
        controller: 'CouponEditCtrl',
        controllerAs: 'Ctrl',
        requireAuth: true
      })
      .when('/licesne', {
        templateUrl: 'views/licesne.html',
        controller: 'LicenseAddCtrl',
        controllerAs: 'Ctrl'
      })
      .when('/licenses/:id', {
        templateUrl: 'views/licesne.html',
        controller: 'LicenseEditCtrl',
        controllerAs: 'Ctrl'
      })
      .when('/licesne_list', {
        templateUrl: 'views/licesne_list.html',
        controller: 'LicesneCtrl',
        controllerAs: 'Ctrl'
      })
      .when('/subscription', {
        templateUrl: 'views/subscription.html',
        controller: 'SubscriptionAddCtrl',
        controllerAs: 'Ctrl'
      }).when('/subscriptions/:id', {
        templateUrl: 'views/subscription.html',
        controller: 'SubscriptionEditCtrl',
        controllerAs: 'Ctrl'
      })
      .when('/subscription_list', {
        templateUrl: 'views/subscription_list.html',
        controller: 'SubscriptionCtrl',
        controllerAs: 'Ctrl'
      })
      .when('/primesubscription-list', {
        templateUrl: 'views/prime-subscription-list.html',
        controller: 'PrimeSubscriptionCtrl',
        controllerAs: 'Ctrl'
      }).when('/add-primesubscription', {
        templateUrl: 'views/prime-subscription-add.html',
        controller: 'AddPrimeSubscriptionCtrl',
        controllerAs: 'Ctrl'
      }).when('/edit-primesubscription/:id', {
        templateUrl: 'views/prime-subscription-edit.html',
        controller: 'EditPrimeSubscriptionCtrl',
        controllerAs: 'Ctrl'
      })
      .when('/currency-list', {
        templateUrl: 'views/currency-list.html',
        controller: 'CurrencyCtrl',
        controllerAs: 'Ctrl'
      }).when('/add-currency', {
        templateUrl: 'views/currency-add.html',
        controller: 'AddCurrencyCtrl',
        controllerAs: 'Ctrl'
      }).when('/edit-currency/:id', {
        templateUrl: 'views/currency-edit.html',
        controller: 'EditCurrencyCtrl',
        controllerAs: 'Ctrl'
      })
      .when('/dispute-list', {
        templateUrl: 'views/dispute-list.html',
        controller: 'DisputeCtrl',
        controllerAs: 'Ctrl'
      }).when('/dispute/:id', {
        templateUrl: 'views/dispute-view.html',
        controller: 'ViewDisputeCtrl',
        controllerAs: 'Ctrl'
      })
      .otherwise({
        redirectTo: '/login'
      });

  })
  .run(['$rootScope', '$location', 'sessionService', function($rootScope, $location, sessionService) {
    $rootScope.$on('$routeChangeStart', function(event, newUrl) {
      if (newUrl.requireAuth && !sessionService.get('token')) {
        event.preventDefault();
        $location.path('/login');
      }
      if(newUrl.controller == "LoginCtrl" && sessionService.get('token')) {
        event.preventDefault();
        $location.path('/');
      }
    });
  }])
  .filter('avatarUrl', function() {
    return function(owner) {
      var url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTg0MjAyNTEzNyB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1ODQyMDI1MTM3Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxNCIgeT0iMzYuNSI+NjR4NjQ8L3RleHQ+PC9nPjwvZz48L3N2Zz4=';
      if (owner && owner.image) {
        url = owner.image.url;
      }
      return url;
    }
  });
