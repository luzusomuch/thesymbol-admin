'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:LicesneCtrl
 * @description
 * # LicesneCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('LicesneCtrl',["licenses", function(licenses) {

    var _this = this;
    _this.title = "View Licenses";
    licenses.query(function(data) {
      if (data.status == "success") {
        console.log(data.response);
        _this.licenses = data.response;
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
      licesnses.update({id:id},{status: status}, function (data) {
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
      licenses.remove({
        id: id
      }, {}, function(data) {
        if (data.status == "success") {
          _this.notify = {
            message: "Deleted Succesfully",
            status: data.status,
            type: "success"
          }
          _this.licenses.splice(index, 1);
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
  .controller('LicenseEditCtrl', [
    'licenses',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(licenses, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Edit Licenses";
      licenses.get({
        id: $routeParams.id
      }, function(data) {
        if (data.status == "success") {
          _this.license = data.response;
          _this.license.name = _this.license.name;
          _this.license.description =_this.license.description;
          _this.license.code=_this.license.code;
          _this.license.uses=_this.license.uses;
          _this.license.start=_this.license.start;
          _this.license.expiry=_this.license.expiry;
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
      _this.saveLicense = function() {
        var license = angular.copy(_this.license);
        license.name = license.name;
        license.description =license.description;
        licenses.update({
          id: $routeParams.id
        }, licenses, function(data) {
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
  .controller('LicenseAddCtrl', [
    'licenses',
    "$scope",
    "$location",
    "$routeParams",
    "sessionService",
    "Upload",
    "endpoint",
    function(licenses, $scope, $location, $routeParams, sessionService, Upload, endpoint) {
      var _this = this;
      _this.title = "Add License";
      _this.saveLicense = function() {

        var license = angular.copy(_this.license);
        license.name = license.name;
        license.description =license.description;

        licenses.create({}, license, function(data) {
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
