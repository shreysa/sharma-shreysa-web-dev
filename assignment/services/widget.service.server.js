module.exports = function (app, models) {

    var widgetModel = models.widgetModel;

   /* var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Are you pondering what I’m pondering? No, it has nothing to do with monkeys and dental floss. We’re ranking every single one of Brain’s schemes—both from the <em>Pinky and the Brain</em> series <em>and</em> their shorts on <em>Animaniacs</em>—and thereby take over the internet! (Enh, we’ll figure that part out later.)</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];*/

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.put("/api/widget/:widgetId", updateWidget);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", reorderWidget);
    
    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.start;
        var end = req.query.end;
        start = start;
        end = end;
       // console.log("in reorder service server");
       //  widgetModel
       //      .findAllWidgetsForPage(pageId)
       //      .then(
       //          function (widgets) {
       //              widgets.forEach(function (widget) {
       //   //               console.log("displaying length of this widget" + widget.name);
       //     //             console.log(widget.order);
       //                  delete widget._id;
       //                  if(widget.order==start){
       //                      console.log(widget.order);
       //                      console.log("before end is assigned");
       //                      widget.order = end;
       //                      console.log(widget.order);
       //                  }
       //                  else if(widget.order> start && widget.order<=end){
       //                      console.log("widget before - 1  " + widget.order);
       //                      widget.order = widget.order -1 ;
       //                      console.log(widget.order);
       //
       //                  }
       //                  else if(widget.order<start && widget.order>=end){
       //                      console.log("widget before + 1  " + widget.order);
       //                      widget.order = widget.order +1 ;
       //                      console.log(widget.order);
       //
       //                  }
       //              });
                    widgetModel
                        .reorderWidget( start, end)
                        .then(
                            function (response) {
                              //  console.log("************");
                               // console.log(response);

                                res.json(widgets);
                            },
                        function (error) {
                            res.json({});
                        });
                //             },
                // function (error) {
                //     res.json({});
                // });
    }

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    


    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId    = req.body.widgetId;
        var myFile        = req.file;
        if(myFile == null)
        {
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
            return;
        }

        var width         = req.body.width;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        // for (var i in widgets) {
        //     if (widgets[i]._id === widgetId) {
        //         widgets[i].url = "/uploads/" + filename;
        //     }
        // }
        var newWidget = {url: "/uploads/" + filename};

        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function (stats) {
                   // console.log(stats);
                    res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );



    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function findAllWidgetsForPage(req, res) {
       // var result = [];
        var id = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(id)
            .then(
                function (widgets) {
                    res.json(widgets);
                },function(error) {
                    res.status(400).send(error);
                });

        // for(var i in widgets){
        //     if(widgets[i].pageId === id){
        //         result.push(widgets[i]);
        //     }
        // }
        // res.send(result)
        // return;

    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function(widget) {
                console.log(widget);
                res.send(widget);
            },function(error) {
                res.status(400).send(error);
            });
        // for (var i in widgets){
        //     if(widgets[i]._id === widgetId){
        //         res.send(widgets[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        console.log(req.body);
        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (Widget) {
                    res.json(Widget);
                },
                function (error) {
                    res.status(400).send(error);

                }

            );
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var newWidget = req.body;
        console.log(req.body);
        widgetModel
            .updateWidget(id, newWidget)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );
        // for (var i in widgets) {
        //     if (widgets[i]._id === id) {
        //         var type = widgets[i].widgetType;
        //         widgets[i] = newWidget;
        //         widgets[i].widgetType = type;
        //         res.send(newWidget);
        //         return;
        //     }
        // }
        // res.send(400);
    }
}
