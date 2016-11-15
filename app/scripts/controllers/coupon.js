'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CouponCtrl
 * @description
 * # CouponCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CouponCtrl', ["coupons", function(coupons) {
    $('#start').datepicker();
    var _this = this;
    _this.title = "View Coupons";
    coupons.query(function(data) {
      if (data.status == "success") {
        console.log(data.response);
        _this.coupons = data.response;
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
      coupons.update({id:id},{status: status}, function (data) {
        if(data.status == "success") {
          _this.notify = {
            message: "Updated Succesfully",
            status: data.status,
            type: "success"
          }
          _this.coupon[index].status = status;
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
      coupons.remove({
        id: id
      }, {}, function(data) {
        if (data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.coupons.splice(index, 1);
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
  .controller('CouponEditCtrl', [
    'coupons',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(coupons, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Edit Coupon";
      coupons.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.coupon = data.response;
          _this.coupon.name = _this.coupon.name;
          _this.coupon.description =_this.coupon.description;
          _this.coupon.code=_this.coupon.code;
          _this.coupon.uses=_this.coupon.uses;
          _this.coupon.start=_this.coupon.start;
          _this.coupon.expiry=_this.coupon.expiry;
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
      _this.saveCoupon = function() {
        var coupon = angular.copy(_this.coupon);
        coupon.name = coupon.name;
        coupon.description =coupon.description;
        coupon.code=coupon.code;
        coupon.uses=coupon.uses;
        coupon.start=coupon.start;
        coupon.expiry=coupon.expiry;

        coupons.update({
          id: $routeParams.id
        }, coupon, function(data) {
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
  .controller('CouponAddCtrl', [
    'coupons',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(coupons, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Add Coupon";
      _this.saveCoupon = function() {
        console.log("F");
        var coupon = angular.copy(_this.coupon);
        coupon.name = coupon.name;
        coupon.description =coupon.description;
        coupon.code=coupon.code;
        coupon.uses=coupon.uses;
        coupon.start=coupon.start;
        coupon.expiry=coupon.expiry;

        coupons.create({}, coupon, function(data) {
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
