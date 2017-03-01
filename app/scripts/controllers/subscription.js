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
    };

    _this.remove = function(id, index) {
      if (window.confirm('Do you want to delete this item?')) {
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
    };
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
      _this.title = "Edit Subscription";

      _this.addFeatures = function(){
        _this.features.push({"feature":""});
      };
      _this.removeFeatures = function($index){
        _this.features.splice($index,1);
      };

      _this.reset = function() {
        _this.subscription = {};
        _this.features = [];
      };
      
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

          _.each(_this.subscription.features, function(item) {
            _this.features.push({feature: item});
          });
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

        var features = [];
        _.each(_this.features, function(value) {
          if (value.feature && value.feature.length > 0) {
            features.push(value.feature);
          }
        });
        subscription.features= features;

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
      };

      _this.removeFeatures = function($index){
        _this.features.splice($index,1);
      };

      _this.reset = function() {
        _this.subscription = {};
        _this.features = [];
      };

      _this.saveSubscription = function() {
        var subscription = angular.copy(_this.subscription);
        subscription.title = subscription.title;
        subscription.description =subscription.description;
        subscription.numbers=subscription.numbers;
        subscription.price=subscription.price;
        subscription.type=subscription.type;

        var features = [];
        _.each(_this.features, function(value) {
          if (value.feature && value.feature.length > 0) {
            features.push(value.feature);
          }
        });
        subscription.features= features;

        subscriptions.create({}, subscription, function(data) {
          if (data.status == "success") {
            _this.notify = {
              message: "Added Succesfully",
              status: data.status,
              type: "success"
            };
            _this.reset();
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
