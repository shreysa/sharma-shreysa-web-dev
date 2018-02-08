module.exports = function() {
  var PageSchema = require("./page.schema.server")();
  var mongoose = require("mongoose");

  var Page = mongoose.model("Page", PageSchema);

  var api = {
    createPage: createPage,
    findPageById: findPageById,
    findAllPagesForWebsite: findAllPagesForWebsite,
    updatePage: updatePage,
    deletePage: deletePage
  };
  return api;

  function createPage(websiteId, newPage) {
    newPage._website = websiteId;
    return Page.create(newPage);
  }

  function findPageById(pageId) {
    return Page.findById({ _id: pageId });
  }

  function findAllPagesForWebsite(websiteId) {
    return Page.find({ _website: websiteId });
  }

  function updatePage(pageId, page) {
    return Page.update(
      { _id: pageId },
      {
        $set: {
          name: page.name,
          title: page.description
        }
      }
    );
  }

  function deletePage(pageId) {
    return Page.remove({ _id: pageId });
  }
};
