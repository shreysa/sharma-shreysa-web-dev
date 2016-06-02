module.exports = function (app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        website._id = (new Date()).getTime().toString();
        websites.push(website);
        res.send(website);

    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        for(var i in websites){
            if(websites[i]._id === id){
                websites.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);

    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;
        for (var i in websites) {
            if (websites[i]._id === id) {
                websites[i].name = newWebsite.name;
              //  websites[i].description = newWebsite.description;
                res.send(newWebsite);
                return;
            }
        }
        res.send(400);
    }

    function findAllWebsitesForUser(req, res) {
        var result = [];
        var id = req.params.userId;
        for(var w in websites){
            if(websites[w].developerId === id){
                result.push(websites[w]);
            }
        }
        res.send(result)
        return;
    }


    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites){
            if(websites[i]._id === websiteId){
                res.send(websites[i]);
                return;
            }
        }
       res.send({});
    }
    
    
}
