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

    var _this = this;

  	this.getAllCurrencies = function() {
  		currencyService.query().$promise.then(function(resp) {
  			if (resp.status==='success') {
  				_this.currencies = resp.response;
  			} else {
  				growl.error(resp.statusMessage);
  			}
  		});
  	};
  	this.getAllCurrencies();

  	this.remove = function(id) {
  		if (window.confirm('Do you really want to delete this item?')) {
  			currencyService.remove({id: id}).$promise.then(function(resp) {
          if (resp.status==='success') {
            var index = _.findIndex(_this.currencies, function(item) {
              return item._id.toString()===id.toString();
            });
            if (index !== -1) {
              _this.currencies.splice(index, 1);
              growl.success('Remove currency successfully');
            }
          } else {
            growl.error(resp.statusMessage);
          }
        });
  		}
  	};
  }]);
