module.exports = function (app, models) {

    var categoryModel = models.categoryModel;
    var restaurantModel = models.restaurantModel;

    app.put("api/projectuser/category/:restaurantId/restaurant", findRestaurantByCategory );
    app.post("/api/projectuser/rating/for/Restaurant/visited/", findRestaurantByRating);


    function findRestaurantByCategory(req, res) {
        console.log(req.body);
        var category = req.body;
        var categoryForRest = category.category;
        categoryModel
            .findRestaurantByCategory(categoryForRest)
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




    
       

