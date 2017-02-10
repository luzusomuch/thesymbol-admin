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

    var _this = this;

  	this.submit = function(form) {
  		_this.submitted = true;
  		if (form.$valid) {
  			primesubscriptionService.update({id: _this.primesubscription._id}, _this.primesubscription).$promise.then(function(data) {
  				if (data.status==='success') {
  					growl.success('Update prime subscription data successfully');
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
