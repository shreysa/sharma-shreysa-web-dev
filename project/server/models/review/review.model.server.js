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
        deleteReview: deleteReview
    };
    return api;
    
    function findReview(userId, reviewId) {
        return Review.findOne({_user: userId, _id: reviewId});
    }

    function findAllReviewsByUserId(userId) {
        return Review.find({_user: userId})
          .populate('_restaurant', '_id name' );
    }

    function updateReview(reviewId, review) {
        return Review
            .update({_id: reviewId}, {
                $set: {
                    reviewText: review.text
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

    function deleteReview(userId, restaurantId) {
        return Review.remove({_user: userId, _restaurant: restaurantId});
    }

};
