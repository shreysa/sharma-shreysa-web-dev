module.exports = function(app, models) {
  var widgetModel = models.widgetModel;

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.put("/api/widget/:widgetId", updateWidget);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/page/:pageId/widget", reorderWidget);

  var multer = require("multer");
  var upload = multer({ dest: __dirname + "/../../public/uploads" });
  app.post("/api/upload", upload.single("myFile"), uploadImage);

  function reorderWidget(req, res) {
    var pageId = req.params.pageId;
    var start = parseInt(req.query.start);
    var end = parseInt(req.query.end);
    start = start;
    end = end;

    widgetModel.reorderWidget(start, end, pageId).then(
      function(stats) {
        res.sendStatus(200);
      },
      function(error) {
        res.sendStatus(400);
      }
    );
  }

  function uploadImage(req, res) {
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var widgetId = req.body.widgetId;
    var myFile = req.file;
    if (myFile == null) {
      res.redirect(
        "/assignment/#/user/" +
          userId +
          "/website/" +
          websiteId +
          "/page/" +
          pageId +
          "/widget/" +
          widgetId
      );
      return;
    }

    var width = req.body.width;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename; // new file name in upload folder
    var path = myFile.path; // full path of uploaded file
    var destination = myFile.destination; // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;
    var newWidget = { url: "/uploads/" + filename };

    widgetModel.updateWidget(widgetId, newWidget).then(
      function(stats) {
        res.redirect(
          "/assignment/#/user/" +
            userId +
            "/website/" +
            websiteId +
            "/page/" +
            pageId +
            "/widget/" +
            widgetId
        );
      },
      function(error) {
        res.statusCode(404).send(error);
      }
    );
  }

  function deleteWidget(req, res) {
    var id = req.params.widgetId;
    widgetModel.deleteWidget(id).then(
      function(stats) {
        console.log(stats);
        res.send(200);
      },
      function(error) {
        res.statusCode(404).send(error);
      }
    );
  }

  function findAllWidgetsForPage(req, res) {
    // var result = [];
    var id = req.params.pageId;
    widgetModel.findAllWidgetsForPage(id).then(
      function(widgets) {
        res.json(widgets);
      },
      function(error) {
        res.status(400).send(error);
      }
    );
  }

  function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    widgetModel.findWidgetById(widgetId).then(
      function(widget) {
        console.log(widget);
        res.send(widget);
      },
      function(error) {
        res.status(400).send(error);
      }
    );
  }

  function createWidget(req, res) {
    var pageId = req.params.pageId;
    var newWidget = req.body;
    console.log(req.body);
    widgetModel.createWidget(pageId, newWidget).then(
      function(Widget) {
        res.json(Widget);
      },
      function(error) {
        res.status(400).send(error);
      }
    );
  }

  function updateWidget(req, res) {
    var id = req.params.widgetId;
    var newWidget = req.body;
    console.log(req.body);
    widgetModel.updateWidget(id, newWidget).then(
      function(stats) {
        console.log(stats);
        res.send(200);
      },
      function(error) {
        res.statusCode(404).send(error);
      }
    );
  }
};
