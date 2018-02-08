module.exports = function (app, models) {

    var categoryModel = models.categoryModel;
    var restaurantModel = models.restaurantModel;

    app.get("/api/projectuser/restaurant/category/type/:category", findRestaurantByCategory );
    app.post("/api/projectuser/rating/for/Restaurant/visited/", findRestaurantByRating);
    app.get("/api/restaurant/city/:city", findRestaurantByCity);



    function findRestaurantByCity(req, res) {
        categoryModel
            .findRestaurantByCity(req.params.city)
            .then(
                function (catRestObj) {
                    res.json(catRestObj);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function findRestaurantByCategory(req, res) {
        console.log(req.params.category);
        var category = req.params.category;
      
        categoryModel
            .findRestaurantByCategory(category)
            .then(
                function (catRestObj) {
                    res.json(catRestObj);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findRestaurantByRating(req, res) {
        var rating = req.body;
            var ratingForRest = rating.rating;
        categoryModel
            .findRestaurantByRating(ratingForRest)
            .then(
                function (catRestObj) {
                    res.json(catRestObj);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
};




    
       

