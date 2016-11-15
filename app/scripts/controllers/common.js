'use strict';

/**
 * @ngdoc function
 * @name eCommerceAdminApp.controller:CommonCtrl
 * @description
 * # CommonCtrl
 * Controller of the eCommerceAdminApp
 */
angular.module('eCommerceAdminApp')
  .controller('CommonCtrl', ["sessionService", function (sessionService) {

    console.log(sessionService);
    var admin = JSON.parse(sessionService.get("user"));
    console.log(admin);
    console.log("ff");
    this.name = admin.name;
    this._id = admin._id;
  }]);
