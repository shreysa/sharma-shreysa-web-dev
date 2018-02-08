module.exports = function() {
  var WidgetSchema = require("./widget.schema.server")();
  var mongoose = require("mongoose");

  var Widget = mongoose.model("Widget", WidgetSchema);

  var api = {
    createWidget: createWidget,
    findWidgetById: findWidgetById,
    findAllWidgetsForPage: findAllWidgetsForPage,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget,
    reorderWidget: reorderWidget
  };
  return api;

  function reorderWidget(start, end, pageId) {
    return Widget.find({ _page: pageId }, function(err, widgets) {
      widgets.forEach(function(widget) {
        if (start < end) {
          if (widget.order === start) {
            widget.order = end;
            widget.save();
          } else if (widget.order > start && widget.order <= end) {
            widget.order--;
            widget.save();
          }
        } else {
          if (widget.order === start) {
            widget.order = end;
            widget.save();
          } else if (widget.order < start && widget.order >= end) {
            widget.order++;
            widget.save();
          }
        }
      });
    });
  }

  function createWidget(pageId, widget) {
    widget._page = pageId;

    return Widget.find({ _page: pageId }).then(
      function(widgets) {
        console.log(widgets.length);
        widget.order = widgets.length;
        return Widget.create(widget);
      },
      function(error) {
        return null;
      }
    );
  }

  function findWidgetById(widgetId) {
    return Widget.findById({ _id: widgetId });
  }

  function findAllWidgetsForPage(pageId) {
    return Widget.find({ _page: pageId });
  }

  function updateWidget(widgetId, newWidget) {
    delete newWidget._id;
    return Widget.update(
      { _id: widgetId },
      {
        $set: newWidget
      }
    );
  }

  function deleteWidget(widgetId) {
    return Widget.remove({ _id: widgetId });
  }
};
