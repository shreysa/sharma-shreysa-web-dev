module.exports = function () {
    var WidgetSchema = require("./widget.schema.server")();
    var mongoose = require("mongoose");

    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateWidget:  updateWidget,
        deleteWidget: deleteWidget

    };
    return api;

    function createWidget(pageId, newWidget) {
        newWidget._page = pageId;
        return Widget.create(newWidget);
    }

    function findWidgetById(widgetId) {
        return Widget.findById({_id: widgetId});
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId});
    }

    function updateWidget(widgetId, newWidget) {
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
