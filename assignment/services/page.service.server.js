module.exports = function (app) {
    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"}
    ];

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);

    function createPage(req, res) {
        var page = req.body;
        page._id = (new Date()).getTime().toString();
        pages.push(page);
        res.send(page);

    }


    function deletePage(req, res) {
        var id = req.params.pageId;
        for(var i in pages){
            if(pages[i]._id === id){
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);


    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;
        for (var i in pages) {
            if (pages[i]._id === id) {
                pages[i].name = newPage.name;
               pages[i].title = newPage.title;
                res.send(newPage);
                return;
            }
        }
        res.send(400);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages){
            if(pages[i]._id === pageId){
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function findAllPagesForWebsite(req, res) {
        var result = [];
        var id = req.params.websiteId;
        for(var i in pages){
            if(pages[i].websiteId === id){
                result.push(pages[i]);
            }
        }
        res.send(result)
        return;
    }
}