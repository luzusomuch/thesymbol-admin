'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:PrimeSubscriptionCtrl
 * @description
 * # PrimeSubscriptionCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('PrimeSubscriptionCtrl', ['primesubscriptionService', 'growl', function(primesubscriptionService, growl) {
  	this.primesubscriptions = [];
    var _this = this;

  	this.getAllPrimesubscriptions = function() {
  		primesubscriptionService.query().$promise.then(function(resp) {
        if (resp.status==='success') {
  			 _this.primesubscriptions = resp.response;
        } else {
          growl.error('Error when fetch data');
        }
  		});
  	};

    this.remove = function(id) {
      if (window.confirm('Do you really want to delete this item?')) {
        primesubscriptionService.remove({id: id}).$promise.then(function(resp) {
          if (resp.status==='success') {
            var index = _.findIndex(_this.primesubscriptions, function(item) {
              return item._id.toString()===id.toString();
            });
            if (index !== -1) {
              _this.primesubscriptions.splice(index, 1);
              growl.success('Remove prime subscription data successfully');
            }
          } else {
            growl.error(resp.statusMessage);
          }
        });
      }
    };

  	this.getAllPrimesubscriptions();

  }]);
