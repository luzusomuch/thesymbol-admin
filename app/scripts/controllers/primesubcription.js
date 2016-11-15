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

  	this.getAllPrimesubscriptions = () => {
  		primesubscriptionService.query().$promise.then(resp => {
        if (resp.status==='success') {
  			 this.primesubscriptions = resp.response;
        } else {
          growl.error('Error when fetch data');
        }
  		});
  	};

    this.remove = (id) => {
      if (window.confirm('Do you really want to delete this item?')) {
        primesubscriptionService.remove({id: id}).$promise.then(resp => {
          if (resp.status==='success') {
            let index = _.findIndex(this.primesubscriptions, (item) => {
              return item._id.toString()===id.toString();
            });
            if (index !== -1) {
              this.primesubscriptions.splice(index, 1);
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
