(function () {
    angular
        .module("EatHeartyApp")
        .factory("YelpService", YelpService )

    function YelpService($http) {

        var index = -1;
        var api = {

            findRestaurant: findRestaurant,
            findRestaurantById: findRestaurantById
        };

        return api;


        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
            return result;
        }

        function findRestaurant(searchFood, searchLocation) {
            // var url = "/api/yelp/" + searchFood + "/" + searchLocation;
            // console.log("client");
            // return $http.get(url);
            var method = 'GET';
            index++
            var url = 'http://api.yelp.com/v2/search';
            var params = {
                callback: 'angular.callbacks._' + index,
                //callback: 'JSON_CALLBACK',
                location: searchLocation,
                oauth_consumer_key: '0pleRLTCX7mUjmMpex_vTw', //Consumer Key
                oauth_token: 'kAHe4lM2wNIQKPYSo2jEN3kh8uELBfdW', //Token
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                term: searchFood
            };
            var consumerSecret = 'x9IeJux2rAi2SWe7vOWpG6HvbzA'; //Consumer Secret
            var tokenSecret = 'mxko16kRw8BO5xSHbJq_MbU5PCA'; //Token Secret
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
            params['oauth_signature'] = signature;
            console.log(params);
           return $http.jsonp(url, {params: params});


        }

        function findRestaurantById(id) {
            // var url = "/api/yelp/" + searchFood + "/" + searchLocation;
          console.log("client");
            // return $http.get(url);
            var method = 'GET';
            index++
            var url = 'http://api.yelp.com/v2/business/' + id;
            var params = {
               callback: 'angular.callbacks._' + index ,
             //   callback: 'JSON_CALLBACK',
                oauth_consumer_key: '0pleRLTCX7mUjmMpex_vTw', //Consumer Key
                oauth_token: 'kAHe4lM2wNIQKPYSo2jEN3kh8uELBfdW', //Token
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                term: 'food'

            };
            var consumerSecret = 'x9IeJux2rAi2SWe7vOWpG6HvbzA'; //Consumer Secret
            var tokenSecret = 'mxko16kRw8BO5xSHbJq_MbU5PCA'; //Token Secret
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
            params['oauth_signature'] = signature;
            console.log(params);
            return $http.jsonp(url, {params: params});


        }

    }

})();