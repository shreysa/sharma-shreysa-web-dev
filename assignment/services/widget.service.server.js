module.exports = function (app) {
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Are you pondering what I’m pondering? No, it has nothing to do with monkeys and dental floss. We’re ranking every single one of Brain’s schemes—both from the <em>Pinky and the Brain</em> series <em>and</em> their shorts on <em>Animaniacs</em>—and thereby take over the internet! (Enh, we’ll figure that part out later.)</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.put("/api/widget/:widgetId", updateWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        console.log("Inside upload");
        console.log(req.body);
        console.log(req.params.userId);
        console.log(req.params.websiteId);
        console.log(req.params.pageId);
        var userId = req.params.userId;
        var websiteId = req.params.websiteId;
        var pageId = req.params.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/" + filename;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);

    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;
        for(var i in widgets){
            if(widgets[i]._id === id){
                widgets.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);

    }

    function findAllWidgetsForPage(req, res) {
        var result = [];
        var id = req.params.pageId;
        for(var i in widgets){
            if(widgets[i].pageId === id){
                result.push(widgets[i]);
            }
        }
        res.send(result)
        return;

    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets){
            if(widgets[i]._id === widgetId){
                res.send(widgets[i]);
                return;
            }
        }
        res.send({});
    }


    function createWidget(req, res) {
        var widget = req.body;
        widget._id = (new Date()).getTime().toString();
        widgets.push(widget);
        res.send(widget);
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var newWidget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id === id) {
                widgets[i] = newWidget;
                res.send(newWidget);
                return;
            }
        }
        res.send(400);
    }
}
