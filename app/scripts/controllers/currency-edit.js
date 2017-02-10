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
  	this.submitted = false;

  	this.addresses = [];
    this.address = {};

    var _this = this;

    currencyService.get({id: $routeParams.id}).$promise.then(function(resp) {
      if (resp.status==='success') {
        _this.currency = resp.response;
        if (_this.currency && _this.currency.countryName) {
          _this.refreshAddresses(_this.currency.countryName, true);
        }
      } else {
        growl.error(resp.statusMessage);
      }
    });
    
    this.refreshAddresses = function(address, auto) {
      if (address.trim().length > 0) {
        var params = {address: address, sensor: false};
        return $http.get(
          'http://maps.googleapis.com/maps/api/geocode/json',
          {params: params}
        ).then( function(response) {
          _this.addresses = response.data.results;
          if (auto) {
          	_this.address.selected = _this.addresses[0];
          }
        });
      }
    };

    $scope.$watch('Ctrl.address.selected', function(nv) {
      if (nv) {
        _.each(nv.address_components, function(item) {
          if (item.types[0]==='country') {
            _this.currency.countryName = item.long_name;
            _this.currency.countryCode = item.short_name;
          }
        });
      }
    }, true);

  	this.submit = function(form) {
  		_this.submitted = true;
  		if (form.$valid) {
  			currencyService.update({id: _this.currency._id}, _this.currency).$promise.then(function(data) {
  				if (data.status==='success') {
  					growl.success('Update currency data successfully');
  					_this.submitted = false;
  				} else {
  					growl.error(data.statusMessage);
  				}
  			});
  		} else {
  			growl.error('Check your input');
  		}
  	}
  }]);
