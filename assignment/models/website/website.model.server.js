module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();

    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateWebsite:  updateWebsite,
        deleteWebsite: deleteWebsite

    };
    return api;

    function createWebsiteForUser(userId, newWebsite) {
        newWebsite._user = userId;
        return Website.create(newWebsite);
    }

    function findWebsiteById(websiteId) {
        return Website.findById({_id: websiteId})
            .populate('_user', 'username email');

    }

    function findAllWebsitesForUser(userId) {
        return Website.find({"_user": userId});
    }

    function updateWebsite(websiteId, website) {
        return Website
            .update({_id: websiteId},{
                $set: {
                    name: website.name,
                    description: website.description
                }
            });
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
};
