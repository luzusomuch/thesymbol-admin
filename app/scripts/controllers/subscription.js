'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:SubscriptionCtrl
 * @description
 * # SubscriptionCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('SubscriptionCtrl',  ["subscriptions", function(subscriptions) {
    $('#start').datepicker();
    var _this = this;
    _this.title = "View Subscriptions";
    subscriptions.query(function(data) {
      if (data.status == "success") {

        console.log(data.response);

        _this.subscriptions = data.response;
      } else {
        _this.notify = {
          message: data.statusMessage,
          status: data.status,
          type: "danger"
        }
      }
    }, function(data) {
      _this.notify = {
        message: data.statusText,
        status: data.status,
        type: "danger"
      }
    });
    _this.updateStatus = function(id, status, index) {
      subscriptions.update({id:id},{status: status}, function (data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Updated Succesfully",
            status: data.status,
            type: "success"
          }
          _this.subscription[index].status = status;
        }
        else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      })
    }

    _this.remove = function(id, index) {
      subscriptions.remove({
        id: id
      }, {}, function(data) {
        if (data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.subscriptions.splice(index, 1);
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
    }
  }])
  .controller('SubscriptionEditCtrl', [
    'subscriptions',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(subscriptions, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.features=[];
      _this.addFeatures = function(){
            _this.features.push({"feature":""});
      }
      _this.removeFeatures = function($index){
          _this.features.splice($index,1);
      }
      _this.title = "Edit Subscription";
      subscriptions.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.subscription = data.response;
          _this.subscription.title = _this.subscription.title;
          _this.subscription.description =_this.subscription.description;
          _this.subscription.numbers=_this.subscription.numbers;
          _this.subscription.price=_this.subscription.price;
          _this.subscription.type=_this.subscription.type;
          _this.features=_this.subscription.features;
        } else {
          _this.notify = {
            message: data.statusMessage,
            status: data.status,
            type: "danger"
          }
        }
      }, function(data) {
        _this.notify = {
          message: data.statusText,
          status: data.status,
          type: "danger"
        }
      });
      _this.saveSubscription = function() {
        var subscription = angular.copy(_this.subscription);
        subscription.title = subscription.title;
        subscription.description =subscription.description;
        subscription.numbers=subscription.numbers;
        subscription.price=subscription.price;
        subscription.type=subscription.type;
        subscription.features=subscription.features;

        subscriptions.update({
          id: $routeParams.id
        }, subscription, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
              status: data.status,
              type: "success"
            }
          } else {
            _this.notify = {
              message: data.statusMessage,
              status: data.status,
              type: "danger"
            }
          }
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }

    }
  ])
  .controller('SubscriptionAddCtrl', [
    'subscriptions',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(subscriptions, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Add Subscription";
      _this.features=[];
      _this.addFeatures = function(){
            _this.features.push({"feature":""});
      }
      _this.removeFeatures = function($index){
          _this.features.splice($index,1);
      }
      _this.saveSubscription = function() {
        console.log("F");
        var subscription = angular.copy(_this.subscription);
        subscription.title = subscription.title;
        subscription.description =subscription.description;
        subscription.numbers=subscription.numbers;
        subscription.price=subscription.price;
        subscription.type=subscription.type;
        subscription.features=subscription.features;

        subscriptions.create({}, subscription, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Updated Succesfully",
              status: data.status,
              type: "success"
            }
          } else {
            _this.notify = {
              message: data.statusMessage,
              status: data.status,
              type: "danger"
            }
          }
        }, function(data) {
          _this.notify = {
            message: data.statusText,
            status: data.status,
            type: "danger"
          }
        });
      }

    }
  ]);
