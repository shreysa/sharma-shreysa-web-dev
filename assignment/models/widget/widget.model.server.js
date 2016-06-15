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

    function reorderWidget(start, end, pageId) {
        return Widget
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    //               console.log("displaying length of this widget" + widget.name);
                    //             console.log(widget.order);
                   // delete widget._id;
                    if(start< end){

                    if(widget.order === start){
                    //    console.log(widget.order);
                     //   console.log("before end is assigned");
                        widget.order = end;
                        widget.save();
                       // console.log(widget.order);
                    }
                    else if(widget.order > start && widget.order <= end){
                     //   console.log("widget before - 1  " + widget.order);
                        widget.order--;
                       
                        widget.save();
                      //  console.log(widget.order);

                    }
                    } else{
                        if(widget.order === start){
                            //    console.log(widget.order);
                            //   console.log("before end is assigned");
                            widget.order = end;
                            widget.save();
                            // console.log(widget.order);
                        }

                    else if(widget.order < start && widget.order >= end){
                      //  console.log("widget before + 1  " + widget.order);
                        widget.order++;
                      
                        widget.save();
                        //console.log(widget.order);

                    }
                    }
                });
    });
    }

    function createWidget(pageId, widget) {
       // console.log(newWidget);
       // console.log("models");
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
      //  console.log("in models");
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
