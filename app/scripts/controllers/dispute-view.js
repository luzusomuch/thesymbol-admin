'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:ViewDisputeCtrl
 * @description
 * # ViewDisputeCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('ViewDisputeCtrl', ['$http', 'growl', 'endpoint', 'sessionService', '$routeParams', function($http, growl, endpoint, sessionService, $routeParams) {
  	var _this = this;
  	this.currentUser = angular.fromJson(sessionService.get('user'));

  	this.getDispute = function() {
  		$http.get(endpoint + '/disputes/'+$routeParams.id, {
    		params: {},
    		headers: {
    			Authorization: sessionService.get('token')
    		}
    	}).then(function(resp) {
    		if (resp.data.status==='success') {
    			_this.dispute = resp.data.response;
    		}
    	});
  	};

  	if ($routeParams.id) {
  		this.getDispute();
  	}

  	this.submitted = false;
	  this.postComment = function(form) {
	  	_this.submitted = true;
	  	if (form.$valid) {
	  		$http.put(endpoint + '/disputes/'+$routeParams.id+'/add-message', {text: _this.commentText}, {
	    		headers: {
	    			Authorization: sessionService.get('token')
	    		}
	    	}).then(function(resp) {
	  			if (resp.data.status==='success') {
	  				_this.submitted = false;
	  				_this.commentText = null;
	  				resp.data.response.ownerId = _this.currentUser;
	  				_this.dispute.messages.push(resp.data.response);
	  			} else {
	  				alert('Something wrong');
	  			}
	  		});
	  	} else {
	  		alert('Please check your input');
	  	}
	  };
  }]);
