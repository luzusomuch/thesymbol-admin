'use strict';

/**
 * @ngdoc service
 * @name eCommerceAdminApp.license
 * @description
 * # license
 * Service in the eCommerceAdminApp.
 */
angular.module('eCommerceAdminApp')
  .service('licenses', ['$resource', 'endpoint', 'sessionService', function($resource, endpoint, sessionService) {
    return $resource(endpoint + "/licenses", {}, {
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
        url: endpoint + "/licenses/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      remove: {
        method: "DELETE",
        url: endpoint + "/licenses/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      },
      update: {
        method: "PUT",
        url: endpoint + "/licenses/:id",
        headers: {
          "Authorization": sessionService.get("token")
        }
      }
    })
  }]);
