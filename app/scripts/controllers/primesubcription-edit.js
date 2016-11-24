'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:EditPrimeSubscriptionCtrl
 * @description
 * # EditPrimeSubscriptionCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('EditPrimeSubscriptionCtrl', ['primesubscriptionService', 'growl', '$routeParams' , function(primesubscriptionService, growl, $routeParams) {
  	primesubscriptionService.get({id: $routeParams.id}).$promise.then(function(resp) {
  		if (resp.status==='success') {
  			this.primesubscription = resp.response;
  		} else {
  			growl.error(resp.statusMessage);
  		}
  	});
  	this.submitted = false;

  	this.submit = function(form) {
  		this.submitted = true;
  		if (form.$valid) {
  			primesubscriptionService.update({id: this.primesubscription._id}, this.primesubscription).$promise.then(function(data) {
  				if (data.status==='success') {
  					growl.success('Update prime subscription data successfully');
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
