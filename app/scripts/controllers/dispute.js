'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:DisputeCtrl
 * @description
 * # DisputeCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('DisputeCtrl', ['$http', 'growl', 'endpoint', 'sessionService', function($http, growl, endpoint, sessionService) {
  	this.disputes = [];
  	var _this = this;

  	this.getAllDisputes = function() {
  		$http.get(endpoint + '/disputes/admin-get-all', {
    		params: {},
    		headers: {
    			Authorization: sessionService.get('token')
    		}
    	}).then(function(resp) {
    		if (resp.data.status==='success') {
    			_this.disputes = resp.data.response;
    		}
    	});
  	};
  	this.getAllDisputes();
  }]);
