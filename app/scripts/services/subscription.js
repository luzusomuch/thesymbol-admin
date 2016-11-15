'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.subscription
 * @description
 * # subscription
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('subscriptions', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/subscriptions", {}, {
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
        url: endpoint + "/subscriptions/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/subscriptions/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      update: {
        method: "PUT",
        url: endpoint + "/subscriptions/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      }
    })
  }]);
