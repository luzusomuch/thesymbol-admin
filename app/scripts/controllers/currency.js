'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CurrencyCtrl
 * @description
 * # CurrencyCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CurrencyCtrl', ['currencyService', 'growl', function(currencyService, growl) {
  	this.currencies = [];

  	this.getAllCurrencies = () => {
  		currencyService.query().$promise.then(resp => {
  			if (resp.status==='success') {
  				this.currencies = resp.response;
  			} else {
  				growl.error(resp.statusMessage);
  			}
  		});
  	};
  	this.getAllCurrencies();

  	this.remove = (id) => {
  		if (window.confirm('Do you really want to delete this item?')) {
  			currencyService.remove({id: id}).$promise.then(resp => {
          if (resp.status==='success') {
            let index = _.findIndex(this.currencies, (item) => {
              return item._id.toString()===id.toString();
            });
            if (index !== -1) {
              this.currencies.splice(index, 1);
              growl.success('Remove currency successfully');
            }
          } else {
            growl.error(resp.statusMessage);
          }
        });
  		}
  	};
  }]);
