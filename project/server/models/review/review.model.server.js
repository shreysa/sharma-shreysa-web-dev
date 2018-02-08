module.exports = function () {
    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server.js")();
    var Review = mongoose.model("Review", ReviewSchema);


    var api = {
        findReview: findReview,
        findAllReviewsByUserId: findAllReviewsByUserId,
        findAllReviewsByRestaurantId : findAllReviewsByRestaurantId,
        updateReview: updateReview,
        addReview: addReview,
        deleteReview: deleteReview,
        getReviewByUserId: getReviewByUserId,
        getAllReviews: getAllReviews,
        deleteReviewByUserId : deleteReviewByUserId
    };
    return api;

    function deleteReviewByUserId(userId) {
        return Review.remove({"_user" : userId});
    }
    
    function getAllReviews() {
        return Review.find()
            .populate('_restaurant', '_id name restaurantId' )
            .populate('_user', '_id username');
    }
    
    function getReviewByUserId(userId, restaurantId) {
        return Review.findOne({_user: userId, _restaurant: restaurantId});
    }
    
    function findReview(userId, reviewId) {
        return Review.findOne({_user: userId, _id: reviewId});
    }

    function findAllReviewsByUserId(userId) {
        return Review.find({_user: userId})
          .populate('_restaurant', '_id name restaurantId' );
    }

    function updateReview(reviewId, review) {
        return Review
            .update({_id: reviewId}, {
                $set: {
                    reviewText:review
                }
            });
    }
 
    function findAllReviewsByRestaurantId(restaurantId) {
        return Review.find({_restaurant: restaurantId})
            .populate('_user', '_id username' );
    }

    function addReview(review) {
        return Review.create(review);
    }

    function deleteReview(reviewId) {
        return Review.remove({_id: reviewId});
    }

};
