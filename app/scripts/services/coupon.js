'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.coupon
 * @description
 * # coupon
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('coupons',['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/coupons", {}, {
      query: {
        method: "GET",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },

      create: {
        method: "POST",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      get: {
        method: "GET",
        url: endpoint + "/coupons/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/coupons/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      update: {
        method: "PUT",
        url: endpoint + "/coupons/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      }
    })
  }]);
