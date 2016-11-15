'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.subscription
 * @description
 * # subscription
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('primesubscriptionService', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/primesubscriptions", {}, {
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
        url: endpoint + "/primesubscriptions/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/primesubscriptions/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      update: {
        method: "PUT",
        url: endpoint + "/primesubscriptions/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      }
    })
  }]);
