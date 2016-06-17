var yelp = require('node-yelp');
module.exports = function (app, models) {

    // var userModel = models.userModel;
    // app.get("/api/yelp/:terms/:location", findRestaurant);
    //
    

    // function findRestaurant(req, res) {
    // //     var terms = req.params.terms;
    // //     var location = req.params.location;
    // //     console.log("server");
    // //     console.log("***********************");
    // //     console.log(terms);
    // //     console.log(location);
    // //     var client = yelp.createClient({
    // //         oauth: {
    // //             consumer_key: "0pleRLTCX7mUjmMpex_vTw",
    // //             consumer_secret: "x9IeJux2rAi2SWe7vOWpG6HvbzA",
    // //             token: "kAHe4lM2wNIQKPYSo2jEN3kh8uELBfdW",
    // //             token_secret: "mxko16kRw8BO5xSHbJq_MbU5PCA"
    // //         },
    // //
    // //         // Optional settings:
    // //         httpClient: {
    // //             maxSockets: 25  // ~> Default is 10
    // //         }
    // //     });
    // //     console.log("inside yelp");
    // //     console.log(req.body);
    // //     console.log("*********************************************************");
    // //     client.search({
    // //         terms: terms,
    // //         location: location
    // //     }).then(function (data) {
    // //         var businesses = data.businesses;
    // //         var location = data.region;
    // //
    // //        // console.log(data);
    // //         return data;
    // //     });
    // //
    // // }
    //
    //     {
    //         var method = 'GET';
    //         var url = 'http://api.yelp.com/v2/search';
    //         var params = {
    //             callback: 'angular.callbacks._0',
    //             location: 'San+Francisc',
    //             oauth_consumer_key: '', //Consumer Key
    //             oauth_token: '', //Token
    //             oauth_signature_method: "HMAC-SHA1",
    //             oauth_timestamp: new Date().getTime(),
    //             oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    //             term: 'food'
    //         };
    //         var consumerSecret = ''; //Consumer Secret
    //         var tokenSecret = ''; //Token Secret
    //         var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
    //         params['oauth_signature'] = signature;
    //         $http.jsonp(url, {params: params})
}


