'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:AddCurrencyCtrl
 * @description
 * # AddCurrencyCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('AddCurrencyCtrl', ['currencyService', 'growl', '$scope', '$http', function(currencyService, growl, $scope, $http) {
  	this.currency = {};
  	this.submitted = false;

  	this.addresses = [];
    this.refreshAddresses = function(address) {
      if (address.trim().length > 0) {
        var params = {address: address, sensor: false};
        return $http.get(
          'http://maps.googleapis.com/maps/api/geocode/json',
          {params: params}
        ).then( function(response) {
          $scope.addresses = response.data.results;
        });
      }
    };

    this.address = {};
    $scope.$watch('Ctrl.address.selected', function(nv) {
      if (nv) {
        _.each(nv.address_components, function(item) {
        	this.reset();
          if (item.types[0]==='country') {
            this.currency.countryName = item.long_name;
            this.currency.countryCode = item.short_name;
          }
        });
      }
    }, true);

  	this.submit = function(form) {
  		this.submitted = true;
  		if (form.$valid) {
  			currencyService.create({}, this.currency).$promise.then(function(data) {
  				if (data.status==='success') {
  					growl.success('Create new currency successfully');
  					this.submitted = false;
  					this.address = {};
  					this.reset();
  				} else {
  					growl.error(data.statusMessage);
  				}
  			});
  		} else {
  			growl.error('Check your input');
  		}
  	}

  	this.reset = function() {
  		this.currency = {};
  	};
  }]);
