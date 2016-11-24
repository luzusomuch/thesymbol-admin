'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:EditCurrencyCtrl
 * @description
 * # EditCurrencyCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('EditCurrencyCtrl', ['currencyService', 'growl', '$routeParams', '$scope', '$http', function(currencyService, growl, $routeParams, $scope, $http) {
  	currencyService.get({id: $routeParams.id}).$promise.then(function(resp) {
  		if (resp.status==='success') {
  			this.currency = resp.response;
  			if (this.currency && this.currency.countryName) {
  				this.refreshAddresses(this.currency.countryName, true);
  			}
  		} else {
  			growl.error(resp.statusMessage);
  		}
  	});
  	this.submitted = false;

  	this.addresses = [];
    this.address = {};
    this.refreshAddresses = function(address, auto) {
      if (address.trim().length > 0) {
        var params = {address: address, sensor: false};
        return $http.get(
          'http://maps.googleapis.com/maps/api/geocode/json',
          {params: params}
        ).then( function(response) {
          this.addresses = response.data.results;
          if (auto) {
          	this.address.selected = this.addresses[0];
          }
        });
      }
    };

    $scope.$watch('Ctrl.address.selected', function(nv) {
      if (nv) {
        _.each(nv.address_components, function(item) {
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
  			currencyService.update({id: this.currency._id}, this.currency).$promise.then(function(data) {
  				if (data.status==='success') {
  					growl.success('Update currency data successfully');
  					this.submitted = false;
  				} else {
  					growl.error(data.statusMessage);
  				}
  			});
  		} else {
  			growl.error('Check your input');
  		}
  	}
  }]);
