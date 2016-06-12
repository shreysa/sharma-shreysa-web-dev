module.exports = function () {
    var WidgetSchema = require("./widget.schema.server")();
    var mongoose = require("mongoose");

    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateWidget:  updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget

    };
    return api;

    function reorderWidget(pageId, widgets) {
        console.log(widgets);
        return Widget.update({_page: pageId}, {$set: widgets}, false, true);
    }

    function createWidget(pageId, widget) {
       // console.log(newWidget);
       // console.log("model");
        widget._page = pageId;

        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    console.log(widgets.length);
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
            function (error) {
                return null;
            });
    }

    function findWidgetById(widgetId) {
        return Widget.findById({_id: widgetId});
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId});
    }

    function updateWidget(widgetId, newWidget) {
      //  console.log("in model");
       // console.log(newWidget);
        delete newWidget._id;
        return Widget
            .update({_id: widgetId},{
                $set: newWidget
            });
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }
};
