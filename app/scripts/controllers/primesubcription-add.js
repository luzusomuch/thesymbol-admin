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

  	this.submit = function(form) {
  		this.submitted = true;
  		if (form.$valid) {
  			primesubscriptionService.create({}, this.primesubscription).$promise.then(function(data) {
  				if (data.status==='success') {
  					growl.success('Create new prime subscription data successfully');
  					this.submitted = false;
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
  		this.primesubscription = {};
  	};
  }]);
