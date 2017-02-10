'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:AddPrimeSubscriptionCtrl
 * @description
 * # AddPrimeSubscriptionCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('AddPrimeSubscriptionCtrl', ['primesubscriptionService', 'growl', function(primesubscriptionService, growl) {
  	this.primesubscription = {};
  	this.submitted = false;
    var _this = this;

  	this.submit = function(form) {
  		_this.submitted = true;
  		if (form.$valid) {
  			primesubscriptionService.create({}, _this.primesubscription).$promise.then(function(data) {
  				if (data.status==='success') {
  					growl.success('Create new prime subscription data successfully');
  					_this.submitted = false;
  					_this.reset();
  				} else {
  					growl.error(data.statusMessage);
  				}
  			});
  		} else {
  			growl.error('Check your input');
  		}
  	}

  	this.reset = function() {
  		_this.primesubscription = {};
  	};
  }]);
